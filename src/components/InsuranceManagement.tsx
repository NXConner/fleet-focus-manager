import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, FileText, AlertTriangle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InsuranceManagement = () => {
  const { toast } = useToast();
  const [policies, setPolicies] = useState([
    {
      id: 1,
      policyName: "Commercial Vehicle Insurance",
      policyNumber: "CV-2024-ABC123",
      provider: "State Farm Commercial",
      type: "Vehicle",
      effectiveDate: "2024-01-01",
      expirationDate: "2024-12-31",
      premium: "$2,400.00",
      coverage: "Comprehensive & Collision",
      status: "Active"
    },
    {
      id: 2,
      policyName: "General Liability Insurance",
      policyNumber: "GL-2024-XYZ789",
      provider: "Travelers Business",
      type: "Liability",
      effectiveDate: "2024-01-01",
      expirationDate: "2024-12-31",
      premium: "$1,800.00",
      coverage: "General Liability & Property",
      status: "Active"
    },
    {
      id: 3,
      policyName: "Workers Compensation",
      policyNumber: "WC-2024-DEF456",
      provider: "Virginia Mutual",
      type: "Workers Comp",
      effectiveDate: "2024-01-01",
      expirationDate: "2024-12-31",
      premium: "$3,200.00",
      coverage: "Employee Injury & Disability",
      status: "Renewal Required"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    policyName: "",
    policyNumber: "",
    provider: "",
    type: "",
    effectiveDate: "",
    expirationDate: "",
    premium: "",
    coverage: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPolicy = {
      id: policies.length + 1,
      ...formData,
      status: "Active"
    };
    setPolicies([...policies, newPolicy]);
    setFormData({
      policyName: "",
      policyNumber: "",
      provider: "",
      type: "",
      effectiveDate: "",
      expirationDate: "",
      premium: "",
      coverage: "",
      notes: ""
    });
    setShowAddForm(false);
    toast({
      title: "Insurance Policy Added",
      description: "New insurance policy has been successfully added.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Renewal Required":
        return "bg-orange-100 text-orange-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isExpiringSoon = (expirationDate: string) => {
    const expiry = new Date(expirationDate);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiry <= thirtyDaysFromNow;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Insurance Management</h2>
          <p className="text-slate-600">Track insurance policies, coverage, and renewal dates</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Policy
        </Button>
      </div>

      {/* Policy Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Renewal Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {policies.filter(p => isExpiringSoon(p.expirationDate)).map(policy => (
                <div key={policy.id} className="text-sm">
                  <p className="font-medium">{policy.policyName}</p>
                  <p className="text-orange-700">Expires: {policy.expirationDate}</p>
                </div>
              ))}
              {policies.filter(p => isExpiringSoon(p.expirationDate)).length === 0 && (
                <p className="text-sm text-gray-600">No policies expiring soon</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Active Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {policies.filter(p => p.status === "Active").length}
            </div>
            <p className="text-sm text-green-600">Policies currently active</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Total Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              ${policies.reduce((sum, p) => sum + parseFloat(p.premium.replace(/[$,]/g, '')), 0).toLocaleString()}
            </div>
            <p className="text-sm text-blue-600">Annual premium costs</p>
          </CardContent>
        </Card>
      </div>

      {showAddForm && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-600" />
              Add Insurance Policy
            </CardTitle>
            <CardDescription>Enter comprehensive insurance policy information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="policyName">Policy Name</Label>
                  <Input
                    id="policyName"
                    value={formData.policyName}
                    onChange={(e) => setFormData({...formData, policyName: e.target.value})}
                    placeholder="Commercial Vehicle Insurance"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
                    placeholder="CV-2024-ABC123"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="provider">Insurance Provider</Label>
                  <Input
                    id="provider"
                    value={formData.provider}
                    onChange={(e) => setFormData({...formData, provider: e.target.value})}
                    placeholder="State Farm Commercial"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Policy Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    placeholder="Vehicle, Liability, Workers Comp, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="premium">Annual Premium</Label>
                  <Input
                    id="premium"
                    value={formData.premium}
                    onChange={(e) => setFormData({...formData, premium: e.target.value})}
                    placeholder="$2,400.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="coverage">Coverage Type</Label>
                  <Input
                    id="coverage"
                    value={formData.coverage}
                    onChange={(e) => setFormData({...formData, coverage: e.target.value})}
                    placeholder="Comprehensive & Collision"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Policy details, deductibles, special conditions..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  Add Policy
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {policies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{policy.policyName}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {policy.type}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </Badge>
                    {isExpiringSoon(policy.expirationDate) && (
                      <Badge className="text-xs bg-orange-100 text-orange-800">
                        Expires Soon
                      </Badge>
                    )}
                  </CardDescription>
                </div>
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Policy Number:</span>
                  <p className="font-mono text-xs">{policy.policyNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <p className="font-medium">{policy.provider}</p>
                </div>
                <div>
                  <span className="text-gray-600">Effective:</span>
                  <p className="font-medium">{policy.effectiveDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">Expires:</span>
                  <p className="font-medium">{policy.expirationDate}</p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Premium:</span>
                    <p className="font-bold text-green-700">{policy.premium}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Coverage:</span>
                    <p className="font-medium text-xs">{policy.coverage}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <FileText className="w-3 h-3 mr-1" />
                  View Policy
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Renew
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InsuranceManagement;
