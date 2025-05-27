
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Navigation, Clock, Gauge } from "lucide-react";

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

const EmployeeMap = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState<EmployeeLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  useEffect(() => {
    fetchActiveLocations();
    
    // Set up real-time subscription for location updates
    const subscription = supabase
      .channel('employee-locations')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'employee_locations' },
        () => fetchActiveLocations()
      )
      .subscribe();

    // Refresh every 30 seconds
    const interval = setInterval(fetchActiveLocations, 30000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

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

      // Group by employee and get latest location for each
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
      toast({
        title: "Error",
        description: "Failed to load employee locations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getGoogleMapsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps?q=${lat},${lng}&z=15`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const activeEmployees = locations.filter(loc => {
    const lastUpdate = new Date(loc.timestamp);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastUpdate > fiveMinutesAgo;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Employee Location Tracking</h2>
          <p className="text-muted-foreground">Real-time GPS tracking of field employees</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <MapPin className="w-4 h-4 mr-1" />
            Active: {activeEmployees.length}
          </Badge>
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Navigation className="w-4 h-4 mr-1" />
            Total: {locations.length}
          </Badge>
        </div>
      </div>

      {/* Location Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => {
          const isActive = new Date(location.timestamp) > new Date(Date.now() - 5 * 60 * 1000);
          const speedMph = location.speed || 0;
          
          return (
            <Card 
              key={location.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                selectedEmployee === location.employee_id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedEmployee(
                selectedEmployee === location.employee_id ? null : location.employee_id
              )}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {location.employee.first_name} {location.employee.last_name}
                    </CardTitle>
                    <CardDescription>{location.employee.position}</CardDescription>
                  </div>
                  <Badge variant={isActive ? "default" : "outline"}>
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Location</span>
                  </div>
                  <div className="text-right font-mono text-xs">
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" />
                    <span>Speed</span>
                  </div>
                  <div className="text-right">
                    {speedMph.toFixed(1)} mph
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Updated</span>
                  </div>
                  <div className="text-right">
                    {formatTimestamp(location.timestamp)}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    <span>Accuracy</span>
                  </div>
                  <div className="text-right">
                    ±{Math.round(location.accuracy)}m
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <a
                    href={getGoogleMapsUrl(location.latitude, location.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="w-full px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors">
                      View on Map
                    </button>
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed View for Selected Employee */}
      {selectedEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Location History</CardTitle>
            <CardDescription>
              Location tracking history for {locations.find(l => l.employee_id === selectedEmployee)?.employee.first_name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LocationHistory employeeId={selectedEmployee} />
          </CardContent>
        </Card>
      )}

      {locations.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No active locations</h3>
            <p className="text-gray-600">
              Employees need to clock in with GPS enabled to appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Component for detailed location history
const LocationHistory = ({ employeeId }: { employeeId: number }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchLocationHistory();
  }, [employeeId]);

  const fetchLocationHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_locations')
        .select('*')
        .eq('employee_id', employeeId)
        .order('timestamp', { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching location history:', error);
    }
  };

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {history.map((location, index) => {
        const prevLocation = history[index + 1];
        let distance = 0;
        if (prevLocation) {
          distance = Math.round(
            calculateDistance(
              location.latitude, location.longitude,
              prevLocation.latitude, prevLocation.longitude
            ) * 5280 // Convert to feet
          );
        }

        return (
          <div key={location.id} className="flex items-center justify-between p-3 border rounded">
            <div className="flex-1">
              <div className="text-sm font-medium">
                {new Date(location.timestamp).toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </div>
              {location.speed > 0 && (
                <div className="text-xs text-gray-600">
                  Speed: {location.speed.toFixed(1)} mph
                </div>
              )}
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-xs">
                ±{Math.round(location.accuracy)}m
              </Badge>
              {distance > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {distance < 1000 ? `${distance}ft` : `${(distance/5280).toFixed(1)}mi`} moved
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Helper function (used in LocationHistory component)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default EmployeeMap;
