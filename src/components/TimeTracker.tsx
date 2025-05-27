
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, MapPin, Play, Square, Coffee, DollarSign, Calendar } from "lucide-react";

interface TimeEntry {
  id: string;
  employee_id: number;
  clock_in_time: string;
  clock_out_time: string;
  break_start_time: string;
  break_end_time: string;
  total_hours: number;
  hourly_rate: number;
  total_pay: number;
  work_date: string;
  status: string;
  location_data: any;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
}

const TimeTracker = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchTimeEntries();
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position),
        (error) => console.error('Error getting location:', error)
      );
    }
  };

  const trackLocation = async (employeeId: number) => {
    if (!location) return;

    try {
      await supabase
        .from('employee_locations')
        .insert({
          employee_id: employeeId,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
          speed: location.coords.speed || 0,
          heading: location.coords.heading || 0,
          is_active: true
        });
    } catch (error) {
      console.error('Error tracking location:', error);
    }
  };

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

  const fetchTimeEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_time_tracking')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTimeEntries(data || []);
    } catch (error) {
      console.error('Error fetching time entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const clockIn = async () => {
    if (!selectedEmployee) {
      toast({
        title: "Error",
        description: "Please select an employee first",
        variant: "destructive",
      });
      return;
    }

    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('employee_time_tracking')
        .insert({
          employee_id: selectedEmployee,
          clock_in_time: now,
          work_date: new Date().toISOString().split('T')[0],
          hourly_rate: 25.00, // Default rate
          status: 'active',
          location_data: location ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: now
          } : null
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentEntry(data);
      trackLocation(selectedEmployee);
      
      toast({
        title: "Clocked In",
        description: "Successfully clocked in",
      });

      fetchTimeEntries();
    } catch (error) {
      console.error('Error clocking in:', error);
      toast({
        title: "Error",
        description: "Failed to clock in",
        variant: "destructive",
      });
    }
  };

  const clockOut = async () => {
    if (!currentEntry) return;

    try {
      const now = new Date().toISOString();
      const clockInTime = new Date(currentEntry.clock_in_time);
      const clockOutTime = new Date(now);
      const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
      const totalPay = totalHours * (currentEntry.hourly_rate || 25);

      const { error } = await supabase
        .from('employee_time_tracking')
        .update({
          clock_out_time: now,
          total_hours: totalHours,
          total_pay: totalPay,
          status: 'completed'
        })
        .eq('id', currentEntry.id);

      if (error) throw error;

      // Mark location as inactive
      await supabase
        .from('employee_locations')
        .update({ is_active: false })
        .eq('employee_id', currentEntry.employee_id)
        .eq('is_active', true);

      setCurrentEntry(null);
      
      toast({
        title: "Clocked Out",
        description: `Worked ${totalHours.toFixed(2)} hours for $${totalPay.toFixed(2)}`,
      });

      fetchTimeEntries();
    } catch (error) {
      console.error('Error clocking out:', error);
      toast({
        title: "Error",
        description: "Failed to clock out",
        variant: "destructive",
      });
    }
  };

  const startBreak = async () => {
    if (!currentEntry) return;

    try {
      const { error } = await supabase
        .from('employee_time_tracking')
        .update({
          break_start_time: new Date().toISOString()
        })
        .eq('id', currentEntry.id);

      if (error) throw error;

      toast({
        title: "Break Started",
        description: "Break time started",
      });

      fetchTimeEntries();
    } catch (error) {
      console.error('Error starting break:', error);
    }
  };

  const endBreak = async () => {
    if (!currentEntry) return;

    try {
      const { error } = await supabase
        .from('employee_time_tracking')
        .update({
          break_end_time: new Date().toISOString()
        })
        .eq('id', currentEntry.id);

      if (error) throw error;

      toast({
        title: "Break Ended",
        description: "Back to work",
      });

      fetchTimeEntries();
    } catch (error) {
      console.error('Error ending break:', error);
    }
  };

  const selectedEmployeeData = employees.find(emp => emp.id === selectedEmployee);
  const todaysEntries = timeEntries.filter(entry => 
    entry.work_date === new Date().toISOString().split('T')[0]
  );
  const totalHoursToday = todaysEntries.reduce((sum, entry) => sum + (entry.total_hours || 0), 0);
  const totalPayToday = todaysEntries.reduce((sum, entry) => sum + (entry.total_pay || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Time Tracker</h2>
          <p className="text-muted-foreground">Employee time tracking and payroll management</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Clock className="w-4 h-4 mr-1" />
            Today: {totalHoursToday.toFixed(1)}h
          </Badge>
          <Badge variant="outline" className="text-lg px-3 py-1">
            <DollarSign className="w-4 h-4 mr-1" />
            ${totalPayToday.toFixed(2)}
          </Badge>
        </div>
      </div>

      {/* Employee Selection and Clock Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Clock
          </CardTitle>
          <CardDescription>Select employee and manage clock in/out</CardDescription>
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
              {location && (
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  Location: {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3">
            {!currentEntry ? (
              <Button onClick={clockIn} disabled={!selectedEmployee} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Clock In
              </Button>
            ) : (
              <>
                <Button onClick={clockOut} className="bg-red-600 hover:bg-red-700">
                  <Square className="w-4 h-4 mr-2" />
                  Clock Out
                </Button>
                <Button onClick={startBreak} variant="outline">
                  <Coffee className="w-4 h-4 mr-2" />
                  Start Break
                </Button>
                <Button onClick={endBreak} variant="outline">
                  End Break
                </Button>
              </>
            )}
          </div>

          {currentEntry && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="font-medium">Currently Clocked In</p>
              <p className="text-sm text-gray-600">
                Started: {new Date(currentEntry.clock_in_time).toLocaleTimeString()}
              </p>
              <p className="text-sm text-gray-600">
                Rate: ${(currentEntry.hourly_rate || 25).toFixed(2)}/hour
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Time Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeEntries.slice(0, 10).map((entry) => {
              const employee = employees.find(emp => emp.id === entry.employee_id);
              const clockIn = new Date(entry.clock_in_time);
              const clockOut = entry.clock_out_time ? new Date(entry.clock_out_time) : null;
              
              return (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">
                        {employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown Employee'}
                      </h4>
                      <Badge variant={entry.status === 'completed' ? 'default' : 'outline'}>
                        {entry.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Date: {new Date(entry.work_date).toLocaleDateString()}</div>
                      <div>
                        Time: {clockIn.toLocaleTimeString()} - {clockOut ? clockOut.toLocaleTimeString() : 'Active'}
                      </div>
                      {entry.total_hours && (
                        <div>Hours: {entry.total_hours.toFixed(2)} | Pay: ${(entry.total_pay || 0).toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                  {entry.location_data && (
                    <div className="text-xs text-gray-500">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      GPS Tracked
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {timeEntries.length === 0 && !loading && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No time entries found</h3>
              <p className="text-gray-600">Clock in to start tracking time</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracker;
