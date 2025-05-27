
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calculator, FileText, Calendar, DollarSign, AlertTriangle } from "lucide-react";

interface TaxRecord {
  id: string;
  tax_year: number;
  tax_type: string;
  amount_owed: number;
  amount_paid: number;
  due_date: string;
  filed_date: string;
  status: string;
  notes: string;
  created_at: string;
}

const TaxManagement = () => {
  const { toast } = useToast();
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    tax_year: new Date().getFullYear(),
    tax_type: "",
    amount_owed: "",
    amount_paid: "",
    due_date: "",
    filed_date: "",
    status: "pending",
    notes: ""
  });

  useEffect(() => {
    fetchTaxRecords();
  }, []);

  const fetchTaxRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('tax_records')
        .select('*')
        .order('tax_year', { ascending: false });

      if (error) throw error;
      setTaxRecords(data || []);
    } catch (error) {
      console.error('Error fetching tax records:', error);
      toast({
        title: "Error",
        description: "Failed to load tax records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('tax_records')
        .insert({
          tax_year: formData.tax_year,
          tax_type: formData.tax_type,
          amount_owed: parseFloat(formData.amount_owed) || 0,
          amount_paid: parseFloat(formData.amount_paid) || 0,
          due_date: formData.due_date || null,
          filed_date: formData.filed_date || null,
          status: formData.status,
          notes: formData.notes
        });

      if (error) throw error;

      setFormData({
        tax_year: new Date().getFullYear(),
        tax_type: "",
        amount_owed: "",
        amount_paid: "",
        due_date: "",
        filed_date: "",
        status: "pending",
        notes: ""
      });

      setShowAddForm(false);
      fetchTaxRecords();
      
      toast({
        title: "Tax Record Added",
        description: "Tax record has been successfully added",
      });
    } catch (error) {
      console.error('Error adding tax record:', error);
      toast({
        title: "Error",
        description: "Failed to add tax record",
        variant: "destructive",
      });
    }
  };

  const updateTaxStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tax_records')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchTaxRecords();
      
      toast({
        title: "Status Updated",
        description: "Tax record status has been updated",
      });
    } catch (error) {
      console.error('Error updating tax status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const taxTypes = ["Federal Income Tax", "State Income Tax", "Payroll Tax", "Sales Tax", "Property Tax", "Business License", "Other"];
  const statusTypes = ["pending", "filed", "paid", "overdue"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "filed": return "bg-blue-100 text-blue-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const currentYear = new Date().getFullYear();
  const currentYearRecords = taxRecords.filter(record => record.tax_year === currentYear);
  const totalOwed = currentYearRecords.reduce((sum, record) => sum + (record.amount_owed || 0), 0);
  const totalPaid = currentYearRecords.reduce((sum, record) => sum + (record.amount_paid || 0), 0);
  const balance = totalOwed - totalPaid;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tax Management</h2>
          <p className="text-muted-foreground">Track and manage company tax obligations</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700">
          <Calculator className="w-4 h-4 mr-2" />
          Add Tax Record
        </Button>
      </div>

      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Owed ({currentYear})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalOwed.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Paid ({currentYear})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalPaid.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Balance ({currentYear})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${balance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overdue Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {taxRecords.filter(r => r.status === 'overdue').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Tax Record Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Tax Record</CardTitle>
            <CardDescription>Add a new tax obligation or record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tax_year">Tax Year</Label>
                  <Input
                    id="tax_year"
                    type="number"
                    value={formData.tax_year}
                    onChange={(e) => setFormData({...formData, tax_year: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tax_type">Tax Type</Label>
                  <select
                    id="tax_type"
                    value={formData.tax_type}
                    onChange={(e) => setFormData({...formData, tax_type: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select tax type</option>
                    {taxTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="amount_owed">Amount Owed</Label>
                  <Input
                    id="amount_owed"
                    type="number"
                    step="0.01"
                    value={formData.amount_owed}
                    onChange={(e) => setFormData({...formData, amount_owed: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="amount_paid">Amount Paid</Label>
                  <Input
                    id="amount_paid"
                    type="number"
                    step="0.01"
                    value={formData.amount_paid}
                    onChange={(e) => setFormData({...formData, amount_paid: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="filed_date">Filed Date</Label>
                  <Input
                    id="filed_date"
                    type="date"
                    value={formData.filed_date}
                    onChange={(e) => setFormData({...formData, filed_date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {statusTypes.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Tax Record</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tax Records List */}
      <div className="space-y-4">
        {Object.entries(
          taxRecords.reduce((acc, record) => {
            if (!acc[record.tax_year]) acc[record.tax_year] = [];
            acc[record.tax_year].push(record);
            return acc;
          }, {} as Record<number, TaxRecord[]>)
        ).map(([year, records]) => (
          <Card key={year}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Tax Year {year}
                <Badge variant="outline">{records.length} records</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {records.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{record.tax_type}</h4>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Owed: ${(record.amount_owed || 0).toFixed(2)} | Paid: ${(record.amount_paid || 0).toFixed(2)}</div>
                        {record.due_date && <div>Due: {new Date(record.due_date).toLocaleDateString()}</div>}
                        {record.filed_date && <div>Filed: {new Date(record.filed_date).toLocaleDateString()}</div>}
                        {record.notes && <div>Notes: {record.notes}</div>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {record.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateTaxStatus(record.id, 'filed')}
                        >
                          Mark Filed
                        </Button>
                      )}
                      {(record.status === 'filed' || record.status === 'pending') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateTaxStatus(record.id, 'paid')}
                        >
                          Mark Paid
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {taxRecords.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tax records found</h3>
            <p className="text-gray-600">Add your first tax record to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxManagement;
