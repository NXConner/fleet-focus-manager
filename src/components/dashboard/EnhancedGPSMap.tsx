
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Play, Pause, RotateCcw, Clock, Gauge } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface EmployeeLocation {
  id: string;
  employee_id: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  heading: number;
  timestamp: string;
  is_active: boolean;
  employee: {
    first_name: string;
    last_name: string;
    position: string;
  };
}

interface TrackingHistory {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  accuracy: number;
}

const EnhancedGPSMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locations, setLocations] = useState<EmployeeLocation[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [trackingHistory, setTrackingHistory] = useState<TrackingHistory[]>([]);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [mapboxToken, setMapboxToken] = useState('');
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});

  // Patrick County, Virginia coordinates
  const PATRICK_COUNTY = {
    center: [-80.2851, 36.6851] as [number, number],
    zoom: 11
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // For now, we'll use a placeholder for the Mapbox token
    // In a real implementation, this should come from environment variables or user input
    const token = 'pk.your_mapbox_token_here';
    setMapboxToken(token);

    if (!token || token === 'pk.your_mapbox_token_here') {
      // Show message to user about needing Mapbox token
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: PATRICK_COUNTY.center,
      zoom: PATRICK_COUNTY.zoom,
      pitch: 0,
      bearing: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);

  useEffect(() => {
    fetchActiveLocations();
    
    const subscription = supabase
      .channel('employee-locations')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'employee_locations' },
        () => fetchActiveLocations()
      )
      .subscribe();

    const interval = setInterval(fetchActiveLocations, 30000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!map.current || !locations.length) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for active employees
    locations.forEach(location => {
      const el = document.createElement('div');
      el.className = 'employee-marker';
      el.style.cssText = `
        background-color: #10b981;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current!);

      // Add popup with employee info
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${location.employee.first_name} ${location.employee.last_name}</h3>
            <p class="text-sm">${location.employee.position}</p>
            <p class="text-xs">Speed: ${location.speed.toFixed(1)} mph</p>
            <p class="text-xs">Updated: ${new Date(location.timestamp).toLocaleTimeString()}</p>
          </div>
        `);

      marker.setPopup(popup);

      // Click handler for detailed view
      el.addEventListener('click', () => {
        setSelectedEmployee(location.employee_id);
        fetchEmployeeHistory(location.employee_id);
      });

      markersRef.current[location.employee_id] = marker;
    });
  }, [locations]);

  const fetchActiveLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_locations')
        .select(`
          *,
          employees!inner(first_name, last_name, position)
        `)
        .eq('is_active', true)
        .order('timestamp', { ascending: false });

      if (error) throw error;

      const latestLocations = data.reduce((acc, location) => {
        const existing = acc.find(l => l.employee_id === location.employee_id);
        if (!existing || new Date(location.timestamp) > new Date(existing.timestamp)) {
          const index = acc.findIndex(l => l.employee_id === location.employee_id);
          const formatted = {
            ...location,
            employee: location.employees
          };
          if (index >= 0) {
            acc[index] = formatted;
          } else {
            acc.push(formatted);
          }
        }
        return acc;
      }, [] as EmployeeLocation[]);

      setLocations(latestLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchEmployeeHistory = async (employeeId: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('employee_locations')
        .select('id, timestamp, latitude, longitude, speed, accuracy')
        .eq('employee_id', employeeId)
        .gte('timestamp', `${today}T00:00:00.000Z`)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setTrackingHistory(data || []);
    } catch (error) {
      console.error('Error fetching employee history:', error);
    }
  };

  const startPlayback = () => {
    if (!trackingHistory.length || !map.current) return;
    
    setIsPlayingBack(true);
    setPlaybackIndex(0);
    
    const playbackInterval = setInterval(() => {
      setPlaybackIndex(prev => {
        if (prev >= trackingHistory.length - 1) {
          setIsPlayingBack(false);
          clearInterval(playbackInterval);
          return prev;
        }
        
        const currentPoint = trackingHistory[prev + 1];
        map.current?.flyTo({
          center: [currentPoint.longitude, currentPoint.latitude],
          zoom: 16,
          duration: 1000
        });
        
        return prev + 1;
      });
    }, 2000);
  };

  const resetView = () => {
    setSelectedEmployee(null);
    setTrackingHistory([]);
    setPlaybackIndex(0);
    setIsPlayingBack(false);
    
    if (map.current) {
      map.current.flyTo({
        center: PATRICK_COUNTY.center,
        zoom: PATRICK_COUNTY.zoom,
        duration: 2000
      });
    }
  };

  const selectedEmployeeData = selectedEmployee 
    ? locations.find(l => l.employee_id === selectedEmployee)
    : null;

  const calculateTotalDistance = () => {
    if (trackingHistory.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < trackingHistory.length; i++) {
      const prev = trackingHistory[i - 1];
      const curr = trackingHistory[i];
      const distance = calculateDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);
      totalDistance += distance;
    }
    return totalDistance;
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (!mapboxToken || mapboxToken === 'pk.your_mapbox_token_here') {
    return (
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Real-Time Employee GPS Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Mapbox Token Required</h3>
            <p className="text-sm text-yellow-700 mb-4">
              To enable the enhanced GPS map with satellite view, please add your Mapbox public token.
            </p>
            <input 
              type="text" 
              placeholder="Enter your Mapbox public token"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-xs text-yellow-600">
              Get your token at <a href="https://mapbox.com/" target="_blank" className="underline">mapbox.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            GPS Tracking - Patrick County, VA
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">
              Active: {locations.length}
            </Badge>
            <Button size="sm" variant="outline" onClick={resetView}>
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 relative">
          <div ref={mapContainer} className="w-full h-full" />
          
          {selectedEmployeeData && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold">
                    {selectedEmployeeData.employee.first_name} {selectedEmployeeData.employee.last_name}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedEmployeeData.employee.position}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-600">Current Speed:</span>
                  <div className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" />
                    {selectedEmployeeData.speed.toFixed(1)} mph
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Last Update:</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(selectedEmployeeData.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              {trackingHistory.length > 0 && (
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Today's Tracking</span>
                    <Badge variant="outline">
                      {trackingHistory.length} points
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    Distance: {calculateTotalDistance().toFixed(1)} miles
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={startPlayback}
                      disabled={isPlayingBack}
                    >
                      {isPlayingBack ? (
                        <Pause className="w-3 h-3 mr-1" />
                      ) : (
                        <Play className="w-3 h-3 mr-1" />
                      )}
                      {isPlayingBack ? 'Playing...' : 'Playback'}
                    </Button>
                  </div>
                  
                  {isPlayingBack && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full transition-all duration-1000"
                          style={{ width: `${(playbackIndex / trackingHistory.length) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {playbackIndex + 1} / {trackingHistory.length}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGPSMap;
