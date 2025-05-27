
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, MapPin, Play, Square, Coffee, Truck, Building, Navigation, AlertCircle } from "lucide-react";

interface JobSite {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radius: number; // geofence radius in meters
}

interface TimeEntry {
  id: string;
  employee_id: number;
  clock_in_time: string;
  clock_out_time: string;
  location_type: 'shop' | 'jobsite' | 'travel';
  job_site_id?: string;
  total_hours: number;
  travel_hours: number;
  work_hours: number;
  status: string;
}

const GeofencedTimeTracker = () => {
  const { toast } = useToast();
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [currentJobSite, setCurrentJobSite] = useState<JobSite | null>(null);
  const [isInShop, setIsInShop] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [jobSites] = useState<JobSite[]>([
    {
      id: '1',
      name: 'Richmond Shopping Center',
      address: '123 Main St, Richmond, VA',
      latitude: 37.5407,
      longitude: -77.4360,
      radius: 100
    },
    {
      id: '2',
      name: 'Norfolk Business Park',
      address: '456 Business Blvd, Norfolk, VA',
      latitude: 36.8508,
      longitude: -76.2859,
      radius: 150
    }
  ]);

  const shopLocation = {
    latitude: 37.4419,
    longitude: -78.6569,
    radius: 50 // 50 meter radius for shop
  };

  useEffect(() => {
    fetchEmployees();
    startLocationTracking();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      checkGeofences();
    }
  }, [currentLocation]);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('id, first_name, last_name, position')
        .order('first_name');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser",
        variant: "destructive",
      });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation(position);
        trackLocation(position);
      },
      (error) => console.error('Error getting location:', error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  };

  const trackLocation = async (position: GeolocationPosition) => {
    if (!selectedEmployee) return;

    try {
      await supabase
        .from('employee_locations')
        .insert({
          employee_id: selectedEmployee,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          speed: position.coords.speed || 0,
          heading: position.coords.heading || 0,
          is_active: true
        });
    } catch (error) {
      console.error('Error tracking location:', error);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const checkGeofences = () => {
    if (!currentLocation) return;

    const { latitude, longitude } = currentLocation.coords;

    // Check if in shop
    const shopDistance = calculateDistance(latitude, longitude, shopLocation.latitude, shopLocation.longitude);
    setIsInShop(shopDistance <= shopLocation.radius);

    // Check job sites
    const nearbyJobSite = jobSites.find(site => {
      const distance = calculateDistance(latitude, longitude, site.latitude, site.longitude);
      return distance <= site.radius;
    });

    setCurrentJobSite(nearbyJobSite || null);
  };

  const autoClockIn = async (locationType: 'shop' | 'jobsite', jobSiteId?: string) => {
    if (!selectedEmployee || currentEntry) return;

    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('employee_time_tracking')
        .insert({
          employee_id: selectedEmployee,
          clock_in_time: now,
          location_type: locationType,
          job_site_id: jobSiteId,
          work_date: new Date().toISOString().split('T')[0],
          hourly_rate: 25.00,
          status: 'active',
          location_data: {
            latitude: currentLocation?.coords.latitude,
            longitude: currentLocation?.coords.longitude,
            timestamp: now,
            auto_clocked: true,
            location_type: locationType
          }
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentEntry(data);
      
      toast({
        title: "Auto Clocked In",
        description: `Automatically clocked in at ${locationType === 'shop' ? 'shop' : currentJobSite?.name}`,
      });
    } catch (error) {
      console.error('Error auto clocking in:', error);
    }
  };

  const autoClockOut = async () => {
    if (!currentEntry) return;

    try {
      const now = new Date().toISOString();
      const clockInTime = new Date(currentEntry.clock_in_time);
      const clockOutTime = new Date(now);
      const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

      const { error } = await supabase
        .from('employee_time_tracking')
        .update({
          clock_out_time: now,
          total_hours: totalHours,
          total_pay: totalHours * 25,
          status: 'completed'
        })
        .eq('id', currentEntry.id);

      if (error) throw error;

      setCurrentEntry(null);
      
      toast({
        title: "Auto Clocked Out",
        description: `Automatically clocked out after ${totalHours.toFixed(2)} hours`,
      });
    } catch (error) {
      console.error('Error auto clocking out:', error);
    }
  };

  const manualClockIn = async (locationType: 'travel') => {
    if (!selectedEmployee) return;

    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('employee_time_tracking')
        .insert({
          employee_id: selectedEmployee,
          clock_in_time: now,
          location_type: locationType,
          work_date: new Date().toISOString().split('T')[0],
          hourly_rate: 25.00,
          status: 'active',
          location_data: {
            latitude: currentLocation?.coords.latitude,
            longitude: currentLocation?.coords.longitude,
            timestamp: now,
            location_type: locationType
          }
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentEntry(data);
      
      toast({
        title: "Clocked In",
        description: `Clocked in for ${locationType}`,
      });
    } catch (error) {
      console.error('Error clocking in:', error);
    }
  };

  const selectedEmployeeData = employees.find(emp => emp.id === selectedEmployee);

  // Auto clock in/out logic
  useEffect(() => {
    if (!selectedEmployee) return;

    if ((isInShop || currentJobSite) && !currentEntry) {
      // Auto clock in when entering shop or job site
      const locationType = isInShop ? 'shop' : 'jobsite';
      autoClockIn(locationType, currentJobSite?.id);
    } else if (!isInShop && !currentJobSite && currentEntry && currentEntry.location_type !== 'travel') {
      // Auto clock out when leaving shop or job site (unless already tracking travel)
      autoClockOut();
    }
  }, [isInShop, currentJobSite, selectedEmployee, currentEntry]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Geofenced Time Tracking</h2>
          <p className="text-muted-foreground">Automatic clock in/out with GPS location tracking</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={currentLocation ? "default" : "outline"} className="text-lg px-3 py-1">
            <MapPin className="w-4 h-4 mr-1" />
            GPS: {currentLocation ? "Active" : "Inactive"}
          </Badge>
          <Badge variant={currentEntry ? "default" : "outline"} className="text-lg px-3 py-1">
            <Clock className="w-4 h-4 mr-1" />
            Status: {currentEntry ? "Clocked In" : "Off Duty"}
          </Badge>
        </div>
      </div>

      {/* Employee Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Employee Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Employee</label>
            <select
              value={selectedEmployee || ""}
              onChange={(e) => setSelectedEmployee(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select an employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.first_name} {emp.last_name} - {emp.position}
                </option>
              ))}
            </select>
          </div>

          {selectedEmployeeData && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium">
                {selectedEmployeeData.first_name} {selectedEmployeeData.last_name}
              </h3>
              <p className="text-sm text-gray-600">{selectedEmployeeData.position}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Current Location Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 ${isInShop ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5" />
                <span className="font-medium">Shop Location</span>
              </div>
              <Badge variant={isInShop ? "default" : "outline"}>
                {isInShop ? "Inside Shop" : "Outside Shop"}
              </Badge>
            </div>

            <div className={`p-4 rounded-lg border-2 ${currentJobSite ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Job Site</span>
              </div>
              {currentJobSite ? (
                <div>
                  <Badge variant="default">At Job Site</Badge>
                  <p className="text-sm mt-1">{currentJobSite.name}</p>
                </div>
              ) : (
                <Badge variant="outline">Not at Job Site</Badge>
              )}
            </div>

            <div className="p-4 rounded-lg border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5" />
                <span className="font-medium">Travel Time</span>
              </div>
              <Button 
                onClick={() => manualClockIn('travel')} 
                disabled={!selectedEmployee || currentEntry?.location_type === 'travel'}
                variant="outline"
                size="sm"
              >
                Track Travel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Time Entry */}
      {currentEntry && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Current Time Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Currently Clocked In</span>
                <Badge variant="default">
                  {currentEntry.location_type === 'shop' ? 'Shop Work' : 
                   currentEntry.location_type === 'jobsite' ? 'Job Site Work' : 
                   'Travel Time'}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Started:</span>
                  <p className="font-medium">{new Date(currentEntry.clock_in_time).toLocaleTimeString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Location Type:</span>
                  <p className="font-medium capitalize">{currentEntry.location_type}</p>
                </div>
                {currentEntry.location_type === 'jobsite' && currentJobSite && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Job Site:</span>
                    <p className="font-medium">{currentJobSite.name}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Geofencing Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Geofencing Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded">
              <h4 className="font-medium mb-1">Automatic Clock In/Out</h4>
              <p>Employees are automatically clocked in when entering the shop or job site geofence, and clocked out when leaving.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              <h4 className="font-medium mb-1">Travel Time Tracking</h4>
              <p>Use the "Track Travel" button to manually log time spent traveling between locations.</p>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <h4 className="font-medium mb-1">GPS Accuracy</h4>
              <p>Current GPS accuracy: ±{currentLocation?.coords.accuracy?.toFixed(0) || 'N/A'} meters</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeofencedTimeTracker;
