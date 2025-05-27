
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Camera, Plus, FileText, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmployeeManagement = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@company.com",
      phone: "(555) 123-4567",
      position: "Equipment Operator",
      hireDate: "2023-06-15",
      birthday: "1985-03-20",
      age: 39,
      emergencyContact: "Jane Smith - (555) 987-6543",
      licenseNumber: "VA123456789",
      w2Filed: true,
      contractSigned: true,
      handbookReceived: true,
      notes: "Certified heavy equipment operator, excellent safety record"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const birthDate = new Date(formData.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    const newEmployee = {
      id: employees.length + 1,
      ...formData,
      age,
      w2Filed: false,
      contractSigned: false,
      handbookReceived: false
    };
    setEmployees([...employees, newEmployee]);
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
    toast({
      title: "Employee Added",
      description: "New employee has been successfully added to the system.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Employee Management</h2>
          <p className="text-slate-600">Manage employee information, contracts, and documentation</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
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

                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload W-2 Forms</p>
                      <Button type="button" variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Driver's License Scan</p>
                      <Button type="button" variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Employment Contract</p>
                      <Button type="button" variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
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

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Employee Handbook & Guidelines</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Include industry standards, OSHA guidelines, Virginia regulations, and company policies.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="handbook" className="rounded" />
                        <label htmlFor="handbook">Employee handbook received and acknowledged</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="osha" className="rounded" />
                        <label htmlFor="osha">OSHA safety training completed</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="virginia" className="rounded" />
                        <label htmlFor="virginia">Virginia state regulations training</label>
                      </div>
                    </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
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
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium text-xs">{employee.phone}</p>
                </div>
                <div>
                  <span className="text-gray-600">Age:</span>
                  <p className="font-medium">{employee.age}</p>
                </div>
                <div>
                  <span className="text-gray-600">Hire Date:</span>
                  <p className="font-medium text-xs">{employee.hireDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">License:</span>
                  <p className="font-mono text-xs">{employee.licenseNumber}</p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Documentation Status</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>W-2 Forms</span>
                    <Badge variant={employee.w2Filed ? "default" : "outline"} className="text-xs">
                      {employee.w2Filed ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Contract</span>
                    <Badge variant={employee.contractSigned ? "default" : "outline"} className="text-xs">
                      {employee.contractSigned ? "Signed" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Handbook</span>
                    <Badge variant={employee.handbookReceived ? "default" : "outline"} className="text-xs">
                      {employee.handbookReceived ? "Received" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Emergency Contact</p>
                <p className="text-xs text-gray-600">{employee.emergencyContact}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <FileText className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
