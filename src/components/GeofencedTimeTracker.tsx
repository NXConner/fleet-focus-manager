
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Navigation, Play, Square, Coffee } from "lucide-react";

interface TimeEntry {
  id: string;
  employee_id: number;
  work_date: string;
  clock_in_time: string;
  clock_out_time: string;
  break_start_time: string;
  break_end_time: string;
  total_hours: number;
  hourly_rate: number;
  overtime_hours: number;
  overtime_rate: number;
  total_pay: number;
  location_data: any;
  notes: string;
  created_at: string;
  // New fields for enhanced tracking
  location_type?: 'shop' | 'job_site' | 'travel';
  travel_hours?: number;
  work_hours?: number;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  hourly_rate: number;
  current_location?: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'clocked_in' | 'clocked_out' | 'on_break' | 'traveling';
  geofence_status: 'in_range' | 'out_of_range';
}

const GeofencedTimeTracker = () => {
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Smith",
      position: "Foreman",
      hourly_rate: 28.00,
      current_location: { lat: 37.7749, lng: -122.4194, address: "Richmond Job Site" },
      status: 'clocked_in',
      geofence_status: 'in_range'
    },
    {
      id: 2,
      name: "Mike Johnson",
      position: "Equipment Operator",
      hourly_rate: 25.00,
      current_location: { lat: 37.7849, lng: -122.4094, address: "Norfolk Business Park" },
      status: 'traveling',
      geofence_status: 'out_of_range'
    }
  ]);

  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Mock geofence zones
  const geofenceZones = [
    { name: "Main Shop", lat: 37.7749, lng: -122.4194, radius: 100 },
    { name: "Richmond Job Site", lat: 37.7849, lng: -122.4094, radius: 50 },
    { name: "Norfolk Business Park", lat: 37.7949, lng: -122.3994, radius: 75 }
  ];

  useEffect(() => {
    // Simulate real-time GPS tracking and auto clock-in/out
    const interval = setInterval(() => {
      employees.forEach(employee => {
        checkGeofenceStatus(employee);
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [employees]);

  const checkGeofenceStatus = (employee: Employee) => {
    if (!employee.current_location) return;

    const isInGeofence = geofenceZones.some(zone => {
      const distance = calculateDistance(
        employee.current_location!.lat,
        employee.current_location!.lng,
        zone.lat,
        zone.lng
      );
      return distance <= zone.radius;
    });

    if (isInGeofence && employee.status === 'clocked_out') {
      autoClockIn(employee);
    } else if (!isInGeofence && employee.status === 'clocked_in') {
      autoClockOut(employee);
    }
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const autoClockIn = (employee: Employee) => {
    const now = new Date();
    const newEntry: TimeEntry = {
      id: `${employee.id}-${now.getTime()}`,
      employee_id: employee.id,
      work_date: now.toISOString().split('T')[0],
      clock_in_time: now.toISOString(),
      clock_out_time: '',
      break_start_time: '',
      break_end_time: '',
      total_hours: 0,
      hourly_rate: employee.hourly_rate,
      overtime_hours: 0,
      overtime_rate: employee.hourly_rate * 1.5,
      total_pay: 0,
      location_data: employee.current_location,
      notes: 'Auto clocked in via geofencing',
      created_at: now.toISOString(),
      location_type: 'job_site',
      travel_hours: 0,
      work_hours: 0
    };

    setTimeEntries(prev => [...prev, newEntry]);
    console.log(`Auto clocked in: ${employee.name}`);
  };

  const autoClockOut = (employee: Employee) => {
    const now = new Date();
    setTimeEntries(prev => 
      prev.map(entry => {
        if (entry.employee_id === employee.id && !entry.clock_out_time) {
          const clockInTime = new Date(entry.clock_in_time);
          const totalHours = (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
          const overtimeHours = Math.max(0, totalHours - 8);
          const regularHours = Math.min(totalHours, 8);
          const totalPay = (regularHours * entry.hourly_rate) + (overtimeHours * entry.overtime_rate);
          
          return {
            ...entry,
            clock_out_time: now.toISOString(),
            total_hours: totalHours,
            overtime_hours: overtimeHours,
            total_pay: totalPay,
            work_hours: totalHours,
            notes: entry.notes + ' - Auto clocked out via geofencing'
          };
        }
        return entry;
      })
    );
    console.log(`Auto clocked out: ${employee.name}`);
  };

  const manualClockAction = (employee: Employee, action: 'clock_in' | 'clock_out' | 'break_start' | 'break_end') => {
    const now = new Date();
    
    if (action === 'clock_in') {
      const newEntry: TimeEntry = {
        id: `${employee.id}-${now.getTime()}`,
        employee_id: employee.id,
        work_date: now.toISOString().split('T')[0],
        clock_in_time: now.toISOString(),
        clock_out_time: '',
        break_start_time: '',
        break_end_time: '',
        total_hours: 0,
        hourly_rate: employee.hourly_rate,
        overtime_hours: 0,
        overtime_rate: employee.hourly_rate * 1.5,
        total_pay: 0,
        location_data: employee.current_location,
        notes: 'Manual clock in',
        created_at: now.toISOString(),
        location_type: 'shop',
        travel_hours: 0,
        work_hours: 0
      };
      setTimeEntries(prev => [...prev, newEntry]);
    } else {
      setTimeEntries(prev => 
        prev.map(entry => {
          if (entry.employee_id === employee.id && !entry.clock_out_time) {
            const updates: Partial<TimeEntry> = {};
            
            if (action === 'clock_out') {
              const clockInTime = new Date(entry.clock_in_time);
              const totalHours = (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
              const overtimeHours = Math.max(0, totalHours - 8);
              const regularHours = Math.min(totalHours, 8);
              const totalPay = (regularHours * entry.hourly_rate) + (overtimeHours * entry.overtime_rate);
              
              updates.clock_out_time = now.toISOString();
              updates.total_hours = totalHours;
              updates.overtime_hours = overtimeHours;
              updates.total_pay = totalPay;
              updates.work_hours = totalHours;
            } else if (action === 'break_start') {
              updates.break_start_time = now.toISOString();
            } else if (action === 'break_end') {
              updates.break_end_time = now.toISOString();
            }
            
            return { ...entry, ...updates };
          }
          return entry;
        })
      );
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'clocked_in': return 'bg-green-500';
      case 'clocked_out': return 'bg-gray-500';
      case 'on_break': return 'bg-yellow-500';
      case 'traveling': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getCurrentEntry = (employeeId: number) => {
    return timeEntries.find(entry => 
      entry.employee_id === employeeId && !entry.clock_out_time
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.filter(e => e.status === 'clocked_in').length}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Geofence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.filter(e => e.geofence_status === 'in_range').length}</div>
            <p className="text-xs text-muted-foreground">Within work zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Traveling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.filter(e => e.status === 'traveling').length}</div>
            <p className="text-xs text-muted-foreground">Between locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hours Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeEntries.reduce((sum, entry) => sum + (entry.total_hours || 0), 0).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Across all employees</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">Live Tracking</TabsTrigger>
          <TabsTrigger value="timesheet">Time Entries</TabsTrigger>
          <TabsTrigger value="geofences">Geofence Zones</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <div className="grid gap-4">
            {employees.map((employee) => {
              const currentEntry = getCurrentEntry(employee.id);
              return (
                <Card key={employee.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {employee.name}
                          <Badge className={getStatusBadgeColor(employee.status)}>
                            {employee.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant={employee.geofence_status === 'in_range' ? 'default' : 'secondary'}>
                            <Navigation className="w-3 h-3 mr-1" />
                            {employee.geofence_status === 'in_range' ? 'In Zone' : 'Out of Zone'}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {employee.position} • ${employee.hourly_rate}/hr
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {employee.status === 'clocked_out' ? (
                          <Button 
                            size="sm" 
                            onClick={() => manualClockAction(employee, 'clock_in')}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Clock In
                          </Button>
                        ) : (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => manualClockAction(employee, 'break_start')}
                            >
                              <Coffee className="w-3 h-3 mr-1" />
                              Break
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => manualClockAction(employee, 'clock_out')}
                            >
                              <Square className="w-3 h-3 mr-1" />
                              Clock Out
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Current Location</div>
                        <div className="font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {employee.current_location?.address || 'Unknown'}
                        </div>
                      </div>
                      {currentEntry && (
                        <>
                          <div>
                            <div className="text-sm text-gray-600">Clock In Time</div>
                            <div className="font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(currentEntry.clock_in_time).toLocaleTimeString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Hours Worked</div>
                            <div className="font-medium">
                              {currentEntry.total_hours > 0 ? 
                                `${currentEntry.total_hours.toFixed(1)} hrs` : 
                                'In progress...'
                              }
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="timesheet">
          <Card>
            <CardHeader>
              <CardTitle>Time Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeEntries.map((entry) => {
                  const employee = employees.find(e => e.id === entry.employee_id);
                  return (
                    <div key={entry.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{employee?.name}</h3>
                        <Badge variant="outline">
                          {new Date(entry.work_date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Clock In:</span>
                          <div>{new Date(entry.clock_in_time).toLocaleTimeString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Clock Out:</span>
                          <div>
                            {entry.clock_out_time ? 
                              new Date(entry.clock_out_time).toLocaleTimeString() : 
                              'Still working'
                            }
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Hours:</span>
                          <div>{entry.total_hours.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Pay:</span>
                          <div>${entry.total_pay.toFixed(2)}</div>
                        </div>
                      </div>
                      {entry.notes && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {entry.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geofences">
          <Card>
            <CardHeader>
              <CardTitle>Geofence Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geofenceZones.map((zone, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{zone.name}</h3>
                        <p className="text-sm text-gray-600">
                          Lat: {zone.lat}, Lng: {zone.lng} • Radius: {zone.radius}m
                        </p>
                      </div>
                      <Badge>
                        {employees.filter(e => {
                          if (!e.current_location) return false;
                          const distance = calculateDistance(
                            e.current_location.lat,
                            e.current_location.lng,
                            zone.lat,
                            zone.lng
                          );
                          return distance <= zone.radius;
                        }).length} employees
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeofencedTimeTracker;
