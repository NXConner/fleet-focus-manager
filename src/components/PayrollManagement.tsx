
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, Users, Calculator, Calendar, FileText, Download } from "lucide-react";

interface PayrollRecord {
  id: string;
  employee_id: number;
  pay_period_start: string;
  pay_period_end: string;
  regular_hours: number;
  overtime_hours: number;
  gross_pay: number;
  federal_tax: number;
  state_tax: number;
  social_security: number;
  medicare: number;
  other_deductions: number;
  net_pay: number;
  pay_date: string;
  status: string;
  employee?: {
    first_name: string;
    last_name: string;
    position: string;
  };
}

interface TimeEntry {
  employee_id: number;
  total_hours: number;
  hourly_rate: number;
  employee: {
    first_name: string;
    last_name: string;
    position: string;
  };
}

const PayrollManagement = () => {
  const { toast } = useToast();
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [pendingTimeEntries, setPendingTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPayroll, setProcessingPayroll] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState({
    start: "",
    end: ""
  });

  useEffect(() => {
    fetchPayrollRecords();
    fetchPendingTimeEntries();
    
    // Set default period to current week
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    setSelectedPeriod({
      start: monday.toISOString().split('T')[0],
      end: sunday.toISOString().split('T')[0]
    });
  }, []);

  const fetchPayrollRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('payroll')
        .select(`
          *,
          employees!inner(first_name, last_name, position)
        `)
        .order('pay_period_end', { ascending: false });

      if (error) throw error;

      const formattedRecords = data.map(record => ({
        ...record,
        employee: record.employees
      }));

      setPayrollRecords(formattedRecords);
    } catch (error) {
      console.error('Error fetching payroll records:', error);
      toast({
        title: "Error",
        description: "Failed to load payroll records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingTimeEntries = async () => {
    try {
      // Get completed time entries that haven't been processed into payroll
      const { data, error } = await supabase
        .from('employee_time_tracking')
        .select(`
          employee_id,
          total_hours,
          hourly_rate,
          employees!inner(first_name, last_name, position)
        `)
        .eq('status', 'completed')
        .gte('work_date', selectedPeriod.start)
        .lte('work_date', selectedPeriod.end);

      if (error) throw error;

      // Group by employee and sum hours
      const groupedEntries = data.reduce((acc, entry) => {
        const existing = acc.find(e => e.employee_id === entry.employee_id);
        if (existing) {
          existing.total_hours += entry.total_hours || 0;
        } else {
          acc.push({
            employee_id: entry.employee_id,
            total_hours: entry.total_hours || 0,
            hourly_rate: entry.hourly_rate || 25,
            employee: entry.employees
          });
        }
        return acc;
      }, [] as TimeEntry[]);

      setPendingTimeEntries(groupedEntries);
    } catch (error) {
      console.error('Error fetching pending time entries:', error);
    }
  };

  const calculatePayroll = (hours: number, rate: number) => {
    const regularHours = Math.min(hours, 40);
    const overtimeHours = Math.max(0, hours - 40);
    const grossPay = (regularHours * rate) + (overtimeHours * rate * 1.5);
    
    // Tax calculations (simplified)
    const federalTax = grossPay * 0.12; // 12% federal tax
    const stateTax = grossPay * 0.06; // 6% state tax
    const socialSecurity = grossPay * 0.062; // 6.2% social security
    const medicare = grossPay * 0.0145; // 1.45% medicare
    
    const totalDeductions = federalTax + stateTax + socialSecurity + medicare;
    const netPay = grossPay - totalDeductions;

    return {
      regularHours,
      overtimeHours,
      grossPay,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      netPay
    };
  };

  const processPayroll = async () => {
    if (!selectedPeriod.start || !selectedPeriod.end) {
      toast({
        title: "Error",
        description: "Please select a pay period",
        variant: "destructive",
      });
      return;
    }

    setProcessingPayroll(true);
    try {
      const payrollData = pendingTimeEntries.map(entry => {
        const calculations = calculatePayroll(entry.total_hours, entry.hourly_rate);
        
        return {
          employee_id: entry.employee_id,
          pay_period_start: selectedPeriod.start,
          pay_period_end: selectedPeriod.end,
          regular_hours: calculations.regularHours,
          overtime_hours: calculations.overtimeHours,
          gross_pay: calculations.grossPay,
          federal_tax: calculations.federalTax,
          state_tax: calculations.stateTax,
          social_security: calculations.socialSecurity,
          medicare: calculations.medicare,
          other_deductions: 0,
          net_pay: calculations.netPay,
          pay_date: new Date().toISOString().split('T')[0],
          status: 'draft'
        };
      });

      const { error } = await supabase
        .from('payroll')
        .insert(payrollData);

      if (error) throw error;

      // Mark time entries as processed
      const { error: updateError } = await supabase
        .from('employee_time_tracking')
        .update({ status: 'approved' })
        .eq('status', 'completed')
        .gte('work_date', selectedPeriod.start)
        .lte('work_date', selectedPeriod.end);

      if (updateError) throw updateError;

      toast({
        title: "Payroll Processed",
        description: `Processed payroll for ${payrollData.length} employees`,
      });

      fetchPayrollRecords();
      fetchPendingTimeEntries();
    } catch (error) {
      console.error('Error processing payroll:', error);
      toast({
        title: "Error",
        description: "Failed to process payroll",
        variant: "destructive",
      });
    } finally {
      setProcessingPayroll(false);
    }
  };

  const exportPayroll = (record: PayrollRecord) => {
    const csvData = {
      'Employee Name': `${record.employee?.first_name} ${record.employee?.last_name}`,
      'Position': record.employee?.position,
      'Pay Period': `${record.pay_period_start} to ${record.pay_period_end}`,
      'Regular Hours': record.regular_hours,
      'Overtime Hours': record.overtime_hours,
      'Gross Pay': record.gross_pay.toFixed(2),
      'Federal Tax': record.federal_tax.toFixed(2),
      'State Tax': record.state_tax.toFixed(2),
      'Social Security': record.social_security.toFixed(2),
      'Medicare': record.medicare.toFixed(2),
      'Net Pay': record.net_pay.toFixed(2),
      'Pay Date': record.pay_date,
      'Status': record.status
    };

    const csv = [
      Object.keys(csvData).join(','),
      Object.values(csvData).map(value => `"${value}"`).join(',')
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payroll_${record.employee?.first_name}_${record.employee?.last_name}_${record.pay_period_end}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalGrossPay = payrollRecords
    .filter(r => r.pay_period_end >= selectedPeriod.start && r.pay_period_end <= selectedPeriod.end)
    .reduce((sum, record) => sum + record.gross_pay, 0);
  
  const totalNetPay = payrollRecords
    .filter(r => r.pay_period_end >= selectedPeriod.start && r.pay_period_end <= selectedPeriod.end)
    .reduce((sum, record) => sum + record.net_pay, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payroll Management</h2>
          <p className="text-muted-foreground">Process and manage employee payroll</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Users className="w-4 h-4 mr-1" />
            Pending: {pendingTimeEntries.length}
          </Badge>
          <Badge variant="outline" className="text-lg px-3 py-1">
            <DollarSign className="w-4 h-4 mr-1" />
            Period Total: ${totalNetPay.toFixed(2)}
          </Badge>
        </div>
      </div>

      {/* Payroll Processing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Process Payroll
          </CardTitle>
          <CardDescription>Select pay period and process employee time into payroll</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="start_date">Pay Period Start</Label>
              <Input
                id="start_date"
                type="date"
                value={selectedPeriod.start}
                onChange={(e) => setSelectedPeriod({...selectedPeriod, start: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="end_date">Pay Period End</Label>
              <Input
                id="end_date"
                type="date"
                value={selectedPeriod.end}
                onChange={(e) => setSelectedPeriod({...selectedPeriod, end: e.target.value})}
              />
            </div>
            <div>
              <Button 
                onClick={fetchPendingTimeEntries}
                variant="outline"
                className="w-full"
              >
                Refresh Pending
              </Button>
            </div>
          </div>

          {pendingTimeEntries.length > 0 && (
            <>
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Pending Time Entries for Processing</h4>
                {pendingTimeEntries.map(entry => {
                  const calc = calculatePayroll(entry.total_hours, entry.hourly_rate);
                  return (
                    <div key={entry.employee_id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">
                          {entry.employee.first_name} {entry.employee.last_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.total_hours.toFixed(1)} hours @ ${entry.hourly_rate}/hr
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${calc.netPay.toFixed(2)} net</div>
                        <div className="text-sm text-gray-600">
                          ${calc.grossPay.toFixed(2)} gross
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button 
                onClick={processPayroll} 
                disabled={processingPayroll}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {processingPayroll ? "Processing..." : `Process Payroll for ${pendingTimeEntries.length} Employees`}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Payroll Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Payroll Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">
                      {record.employee?.first_name} {record.employee?.last_name}
                    </h4>
                    <p className="text-sm text-gray-600">{record.employee?.position}</p>
                    <p className="text-sm text-gray-600">
                      Pay Period: {new Date(record.pay_period_start).toLocaleDateString()} - {new Date(record.pay_period_end).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={record.status === 'paid' ? 'default' : 'outline'}>
                      {record.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => exportPayroll(record)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Regular Hours:</span>
                    <p className="font-medium">{record.regular_hours.toFixed(1)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Overtime Hours:</span>
                    <p className="font-medium">{record.overtime_hours.toFixed(1)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Gross Pay:</span>
                    <p className="font-medium">${record.gross_pay.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Net Pay:</span>
                    <p className="font-medium text-green-600">${record.net_pay.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                    <div>Federal Tax: ${record.federal_tax.toFixed(2)}</div>
                    <div>State Tax: ${record.state_tax.toFixed(2)}</div>
                    <div>Social Security: ${record.social_security.toFixed(2)}</div>
                    <div>Medicare: ${record.medicare.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {payrollRecords.length === 0 && !loading && (
            <div className="text-center py-8">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payroll records found</h3>
              <p className="text-gray-600">Process your first payroll to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollManagement;
