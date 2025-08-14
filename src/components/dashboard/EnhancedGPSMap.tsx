import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Play, Pause, RotateCcw, Clock, Gauge, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MapSourceSelector, { MAP_SOURCES, MapSource } from './MapSourceSelector';
import MultiProviderMap from './MultiProviderMap';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

type GenericMap = {
  flyTo?: (opts: { center: [number, number]; zoom: number; duration: number }) => void;
  setCenter?: (pos: { lat: number; lng: number }) => void;
  setZoom?: (zoom: number) => void;
  setView?: (coords: [number, number], zoom: number) => void;
};

type MarkerLike = {
  remove?: () => void;
  setMap?: (map: unknown | null) => void;
  bindPopup?: (html: string) => void;
  on?: (event: string, handler: () => void) => void;
};

const EnhancedGPSMap = () => {
  const [locations, setLocations] = useState<EmployeeLocation[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [trackingHistory, setTrackingHistory] = useState<TrackingHistory[]>([]);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [mapboxToken, setMapboxToken] = useState('');
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [selectedMapSource, setSelectedMapSource] = useState('esri-satellite');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [currentMap, setCurrentMap] = useState<GenericMap | null>(null);
  const markersRef = useRef<{ [key: number]: MarkerLike }>({});

  // Patrick County, Virginia coordinates
  const PATRICK_COUNTY = {
    center: [-80.2851, 36.6851] as [number, number],
    zoom: 11
  };

  const currentMapSource = MAP_SOURCES.find(source => source.id === selectedMapSource) || MAP_SOURCES[0];

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
    if (!locations.length) return;

    if (currentMap) {
      addMarkersToMap(currentMap);
    }
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
    if (!trackingHistory.length || !currentMap) return;
    
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

        if (currentMapSource.type === 'mapbox') {
          currentMap?.flyTo({
            center: [currentPoint.longitude, currentPoint.latitude],
            zoom: 16,
            duration: 1000
          });
        } else if (currentMapSource.type === 'google') {
          currentMap.setCenter({ lat: currentPoint.latitude, lng: currentPoint.longitude });
          currentMap.setZoom(16);
        } else if (currentMapSource.type === 'leaflet') {
          currentMap.setView([currentPoint.latitude, currentPoint.longitude], 16);
        }
        
        return prev + 1;
      });
    }, 2000);
  };

  const resetView = () => {
    setSelectedEmployee(null);
    setTrackingHistory([]);
    setPlaybackIndex(0);
    setIsPlayingBack(false);
    
    if (currentMap) {
      if (currentMapSource.type === 'mapbox') {
        currentMap.flyTo({
          center: PATRICK_COUNTY.center,
          zoom: PATRICK_COUNTY.zoom,
          duration: 2000
        });
      } else if (currentMapSource.type === 'google') {
        currentMap.setCenter({ lat: PATRICK_COUNTY.center[1], lng: PATRICK_COUNTY.center[0] });
        currentMap.setZoom(PATRICK_COUNTY.zoom);
      } else if (currentMapSource.type === 'leaflet') {
        currentMap.setView([PATRICK_COUNTY.center[1], PATRICK_COUNTY.center[0]], PATRICK_COUNTY.zoom);
      }
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

  const handleMapLoad = (map: unknown) => {
    const typedMap = map as GenericMap;
    setCurrentMap(typedMap);
    if (locations.length > 0) {
      addMarkersToMap(typedMap);
    }
  };

  const addMarkersToMap = (map: GenericMap | null) => {
    if (!map || !locations.length) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      if (marker.remove) marker.remove();
      if (marker.setMap) marker.setMap(null);
    });
    markersRef.current = {};

    locations.forEach(location => {
      if (currentMapSource.type === 'mapbox') {
        addMapboxMarker(map, location);
      } else if (currentMapSource.type === 'google') {
        addGoogleMarker(map, location);
      } else if (currentMapSource.type === 'leaflet') {
        addLeafletMarker(map, location);
      }
    });
  };

  const addMapboxMarker = (map: GenericMap, location: EmployeeLocation) => {
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

    const marker = new window.mapboxgl.Marker(el)
      .setLngLat([location.longitude, location.latitude])
      .addTo(map as unknown as any);

    const popup = new window.mapboxgl.Popup({ offset: 25 })
      .setHTML(getMarkerPopupContent(location));

    marker.setPopup(popup);
    el.addEventListener('click', () => handleMarkerClick(location));
    markersRef.current[location.employee_id] = marker as unknown as MarkerLike;
  };

  const addGoogleMarker = (map: GenericMap, location: EmployeeLocation) => {
    const marker = new window.google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map: map as unknown as any,
      title: `${location.employee.first_name} ${location.employee.last_name}`,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#10b981',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
      }
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: getMarkerPopupContent(location)
    });

    marker.addListener('click', () => {
      infoWindow.open(map as unknown as any, marker);
      handleMarkerClick(location);
    });

    markersRef.current[location.employee_id] = marker as unknown as MarkerLike;
  };

  const addLeafletMarker = (map: GenericMap, location: EmployeeLocation) => {
    const marker = window.L.circleMarker([location.latitude, location.longitude], {
      radius: 10,
      fillColor: '#10b981',
      fillOpacity: 1,
      color: 'white',
      weight: 2
    }).addTo(map as unknown as any);

    marker.bindPopup(getMarkerPopupContent(location));
    marker.on('click', () => handleMarkerClick(location));
    markersRef.current[location.employee_id] = marker as unknown as MarkerLike;
  };

  const getMarkerPopupContent = (location: EmployeeLocation) => {
    return `
      <div class="p-2">
        <h3 class="font-bold">${location.employee.first_name} ${location.employee.last_name}</h3>
        <p class="text-sm">${location.employee.position}</p>
        <p class="text-xs">Speed: ${location.speed.toFixed(1)} mph</p>
        <p class="text-xs">Updated: ${new Date(location.timestamp).toLocaleTimeString()}</p>
      </div>
    `;
  };

  const handleMarkerClick = (location: EmployeeLocation) => {
    setSelectedEmployee(location.employee_id);
    fetchEmployeeHistory(location.employee_id);
  };

  useEffect(() => {
    if (currentMap && locations.length > 0) {
      addMarkersToMap(currentMap);
    }
  }, [locations, currentMap, currentMapSource]);

  const getAvailableMapSources = () => {
    return MAP_SOURCES.filter(source => {
      if (source.requiresApiKey) {
        if (source.type === 'mapbox') return mapboxToken && mapboxToken !== 'pk.your_mapbox_token_here';
        if (source.type === 'google') return googleMapsApiKey;
      }
      return true;
    });
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            GPS Tracking - Patrick County, VA
          </CardTitle>
          <div className="flex gap-2 items-center">
            <MapSourceSelector 
              selectedSource={selectedMapSource}
              onSourceChange={setSelectedMapSource}
              availableSources={getAvailableMapSources()}
            />
            <Badge variant="outline">
              Active: {locations.length}
            </Badge>
            <Button size="sm" variant="outline" onClick={() => setShowApiSettings(!showApiSettings)}>
              <Settings className="w-3 h-3 mr-1" />
              Settings
            </Button>
            <Button size="sm" variant="outline" onClick={resetView}>
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset View
            </Button>
          </div>
        </div>

        <Collapsible open={showApiSettings} onOpenChange={setShowApiSettings}>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
                <Input 
                  id="mapbox-token"
                  type="text" 
                  placeholder="pk.your_mapbox_token_here"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Get your token at <a href="https://mapbox.com/" target="_blank" className="underline">mapbox.com</a>
                </p>
              </div>
              <div>
                <Label htmlFor="google-api-key">Google Maps API Key</Label>
                <Input 
                  id="google-api-key"
                  type="text" 
                  placeholder="Your Google Maps API Key"
                  value={googleMapsApiKey}
                  onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Get your key at <a href="https://developers.google.com/maps" target="_blank" className="underline">Google Maps Platform</a>
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 relative">
          <MultiProviderMap
            mapSource={currentMapSource}
            center={PATRICK_COUNTY.center}
            zoom={PATRICK_COUNTY.zoom}
            onMapLoad={handleMapLoad}
            mapboxToken={mapboxToken}
            googleMapsApiKey={googleMapsApiKey}
            className="w-full h-full"
          />
          
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
