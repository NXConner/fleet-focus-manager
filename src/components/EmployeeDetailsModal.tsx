
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, Calendar, AlertCircle, CheckCircle, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DocumentUpload from "./DocumentUpload";

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

interface EmployeeDetailsModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (employee: Employee) => void;
}

const EmployeeDetailsModal = ({ employee, isOpen, onClose, onUpdate }: EmployeeDetailsModalProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [editForm, setEditForm] = useState<Employee | null>(null);

  useEffect(() => {
    if (employee) {
      setEditForm(employee);
      fetchDocuments();
    }
  }, [employee]);

  const fetchDocuments = async () => {
    if (!employee) return;
    
    try {
      const { data, error } = await supabase
        .from('employee_documents')
        .select('*')
        .eq('employee_id', employee.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSave = async () => {
    if (!editForm || !employee) return;

    try {
      const { error } = await supabase
        .from('employees')
        .update({
          first_name: editForm.firstName,
          last_name: editForm.lastName,
          email: editForm.email,
          phone: editForm.phone,
          position: editForm.position,
          hire_date: editForm.hireDate,
          birthday: editForm.birthday,
          emergency_contact: editForm.emergencyContact,
          license_number: editForm.licenseNumber,
          w2_filed: editForm.w2Filed,
          contract_signed: editForm.contractSigned,
          handbook_received: editForm.handbookReceived,
          notes: editForm.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', employee.id);

      if (error) throw error;

      onUpdate(editForm);
      setIsEditing(false);
      toast({
        title: "Employee Updated",
        description: "Employee information has been successfully updated.",
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update employee information.",
        variant: "destructive",
      });
    }
  };

  const getComplianceStatus = () => {
    if (!employee) return { completed: 0, total: 3, percentage: 0 };
    
    const completed = [employee.w2Filed, employee.contractSigned, employee.handbookReceived].filter(Boolean).length;
    const total = 3;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  if (!employee) return null;

  const compliance = getComplianceStatus();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <User className="w-6 h-6 text-purple-600" />
                {employee.firstName} {employee.lastName}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{employee.position}</Badge>
                <span>•</span>
                <span>Employee ID: {employee.id}</span>
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      {isEditing ? (
                        <Input
                          value={editForm?.firstName || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, firstName: e.target.value} : null)}
                        />
                      ) : (
                        <p className="font-medium">{employee.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      {isEditing ? (
                        <Input
                          value={editForm?.lastName || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, lastName: e.target.value} : null)}
                        />
                      ) : (
                        <p className="font-medium">{employee.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        value={editForm?.email || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, email: e.target.value} : null)}
                      />
                    ) : (
                      <p className="font-medium">{employee.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input
                        value={editForm?.phone || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, phone: e.target.value} : null)}
                      />
                    ) : (
                      <p className="font-medium">{employee.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editForm?.birthday || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, birthday: e.target.value} : null)}
                      />
                    ) : (
                      <p className="font-medium">{employee.birthday} (Age: {employee.age})</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Position</Label>
                    {isEditing ? (
                      <Input
                        value={editForm?.position || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, position: e.target.value} : null)}
                      />
                    ) : (
                      <p className="font-medium">{employee.position}</p>
                    )}
                  </div>
                  <div>
                    <Label>Hire Date</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editForm?.hireDate || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, hireDate: e.target.value} : null)}
                      />
                    ) : (
                      <p className="font-medium">{employee.hireDate}</p>
                    )}
                  </div>
                  <div>
                    <Label>License Number</Label>
                    {isEditing ? (
                      <Input
                        value={editForm?.licenseNumber || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, licenseNumber: e.target.value} : null)}
                      />
                    ) : (
                      <p className="font-mono text-sm">{employee.licenseNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    {isEditing ? (
                      <Input
                        value={editForm?.emergencyContact || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, emergencyContact: e.target.value} : null)}
                      />
                    ) : (
                      <p className="font-medium">{employee.emergencyContact}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editForm?.notes || ''}
                    onChange={(e) => setEditForm(prev => prev ? {...prev, notes: e.target.value} : null)}
                    rows={4}
                    placeholder="Add notes about the employee..."
                  />
                ) : (
                  <p className="text-gray-700">{employee.notes || 'No notes available.'}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentUpload
              employeeId={employee.id}
              documents={documents}
              onDocumentUploaded={fetchDocuments}
            />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Compliance Status
                </CardTitle>
                <CardDescription>
                  Employee documentation and compliance tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overall Progress</span>
                  <Badge variant={compliance.percentage === 100 ? "default" : "outline"}>
                    {compliance.completed}/{compliance.total} Complete ({compliance.percentage.toFixed(0)}%)
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {employee.w2Filed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                      <span>W-2 Forms Filed</span>
                    </div>
                    <Badge variant={employee.w2Filed ? "default" : "outline"}>
                      {employee.w2Filed ? "Complete" : "Pending"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {employee.contractSigned ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                      <span>Employment Contract</span>
                    </div>
                    <Badge variant={employee.contractSigned ? "default" : "outline"}>
                      {employee.contractSigned ? "Signed" : "Pending"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {employee.handbookReceived ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                      <span>Employee Handbook</span>
                    </div>
                    <Badge variant={employee.handbookReceived ? "default" : "outline"}>
                      {employee.handbookReceived ? "Received" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Activity History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border-l-4 border-l-blue-500 bg-blue-50">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Employee hired</p>
                      <p className="text-sm text-gray-600">{employee.hireDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border-l-4 border-l-gray-300 bg-gray-50">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="font-medium">Profile created</p>
                      <p className="text-sm text-gray-600">Employee record established</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsModal;
