
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Plus, FileText, User, Search, Filter, UserPlus, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  hireDate: string;
  birthday: string;
  age: number;
  emergencyContact: string;
  licenseNumber: string;
  w2Filed: boolean;
  contractSigned: boolean;
  handbookReceived: boolean;
  notes: string;
}

const EmployeeManagement = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    hireDate: "",
    birthday: "",
    emergencyContact: "",
    licenseNumber: "",
    notes: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedEmployees = data.map(emp => ({
        id: emp.id,
        firstName: emp.first_name,
        lastName: emp.last_name,
        email: emp.email,
        phone: emp.phone || '',
        position: emp.position || '',
        hireDate: emp.hire_date || '',
        birthday: emp.birthday || '',
        age: emp.age || 0,
        emergencyContact: emp.emergency_contact || '',
        licenseNumber: emp.license_number || '',
        w2Filed: emp.w2_filed || false,
        contractSigned: emp.contract_signed || false,
        handbookReceived: emp.handbook_received || false,
        notes: emp.notes || ''
      }));

      setEmployees(formattedEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to load employees. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      const { error } = await supabase
        .from('employees')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          hire_date: formData.hireDate,
          birthday: formData.birthday,
          age,
          emergency_contact: formData.emergencyContact,
          license_number: formData.licenseNumber,
          notes: formData.notes
        });

      if (error) throw error;

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        hireDate: "",
        birthday: "",
        emergencyContact: "",
        licenseNumber: "",
        notes: ""
      });
      setShowAddForm(false);
      fetchEmployees();
      
      toast({
        title: "Employee Added",
        description: "New employee has been successfully added to the system.",
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleEmployeeUpdate = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
  };

  const exportEmployeeData = () => {
    const csvData = employees.map(emp => ({
      ID: emp.id,
      'First Name': emp.firstName,
      'Last Name': emp.lastName,
      Email: emp.email,
      Phone: emp.phone,
      Position: emp.position,
      'Hire Date': emp.hireDate,
      'Date of Birth': emp.birthday,
      Age: emp.age,
      'Emergency Contact': emp.emergencyContact,
      'License Number': emp.licenseNumber,
      'W-2 Filed': emp.w2Filed ? 'Yes' : 'No',
      'Contract Signed': emp.contractSigned ? 'Yes' : 'No',
      'Handbook Received': emp.handbookReceived ? 'Yes' : 'No',
      Notes: emp.notes
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Employee data has been exported to CSV.",
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = (
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "complete") {
      return matchesSearch && employee.w2Filed && employee.contractSigned && employee.handbookReceived;
    }
    if (filterStatus === "incomplete") {
      return matchesSearch && (!employee.w2Filed || !employee.contractSigned || !employee.handbookReceived);
    }
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Employee Management</h2>
          <p className="text-slate-600">Manage employee information, contracts, and documentation</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportEmployeeData} variant="outline" className="bg-green-50 hover:bg-green-100">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-purple-600 hover:bg-purple-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees by name, email, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Employees</option>
                <option value="complete">Compliance Complete</option>
                <option value="incomplete">Compliance Incomplete</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Add New Employee
            </CardTitle>
            <CardDescription>Enter comprehensive employee information and documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="emergency">Emergency</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Smith"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john.smith@company.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="birthday">Date of Birth</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="employment" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        placeholder="Equipment Operator"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hireDate">Hire Date</Label>
                      <Input
                        id="hireDate"
                        type="date"
                        value={formData.hireDate}
                        onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="licenseNumber">Driver's License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                      placeholder="VA123456789"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Employment Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Certifications, skills, performance notes..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="space-y-4">
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                      placeholder="Jane Smith - (555) 987-6543"
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Add Employee
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => {
          const complianceCount = [employee.w2Filed, employee.contractSigned, employee.handbookReceived].filter(Boolean).length;
          const compliancePercentage = (complianceCount / 3) * 100;
          
          return (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleEmployeeClick(employee)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {employee.firstName} {employee.lastName}
                    </CardTitle>
                    <CardDescription className="flex flex-col gap-1 mt-1">
                      <Badge variant="outline" className="text-xs w-fit">
                        {employee.position}
                      </Badge>
                      <span className="text-sm text-gray-600">{employee.email}</span>
                    </CardDescription>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="font-medium text-xs">{employee.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Age:</span>
                    <p className="font-medium">{employee.age || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Hire Date:</span>
                    <p className="font-medium text-xs">{employee.hireDate || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">License:</span>
                    <p className="font-mono text-xs">{employee.licenseNumber || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">Compliance Status</p>
                    <Badge variant={compliancePercentage === 100 ? "default" : "outline"} className="text-xs">
                      {complianceCount}/3 Complete
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        compliancePercentage === 100 ? 'bg-green-500' : 
                        compliancePercentage >= 66 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${compliancePercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Emergency Contact</p>
                  <p className="text-xs text-gray-600">{employee.emergencyContact || 'Not provided'}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={(e) => {
                    e.stopPropagation();
                    handleEmployeeClick(employee);
                  }}>
                    <FileText className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredEmployees.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria." 
                : "Get started by adding your first employee."
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button onClick={() => setShowAddForm(true)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add First Employee
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <EmployeeDetailsModal
        employee={selectedEmployee}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedEmployee(null);
        }}
        onUpdate={handleEmployeeUpdate}
      />
    </div>
  );
};

export default EmployeeManagement;
