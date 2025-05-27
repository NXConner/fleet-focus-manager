
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Camera, Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EquipmentManagement = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState([
    {
      id: 1,
      name: "1985 Bobcat Skidsteer",
      type: "Skidsteer",
      model: "743",
      serialNumber: "BS85-123456",
      year: "1985",
      status: "Operational",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-04-15",
      notes: "Hydraulic fluid changed, tracks inspected"
    },
    {
      id: 2,
      name: "Echo PB-580T Backpack Blower",
      type: "Blower",
      model: "PB-580T",
      serialNumber: "EC24-789012",
      year: "2023",
      status: "Operational",
      lastMaintenance: "2024-02-01",
      nextMaintenance: "2024-05-01",
      notes: "Air filter cleaned, spark plug replaced"
    },
    {
      id: 3,
      name: "Stihl MS 271 Chainsaw",
      type: "Chainsaw",
      model: "MS 271",
      serialNumber: "ST23-345678",
      year: "2023",
      status: "Maintenance Required",
      lastMaintenance: "2023-12-10",
      nextMaintenance: "2024-03-10",
      notes: "Chain needs sharpening, oil leak minor"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    model: "",
    serialNumber: "",
    year: "",
    status: "Operational",
    purchaseDate: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEquipment = {
      id: equipment.length + 1,
      ...formData,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setEquipment([...equipment, newEquipment]);
    setFormData({
      name: "",
      type: "",
      model: "",
      serialNumber: "",
      year: "",
      status: "Operational",
      purchaseDate: "",
      notes: ""
    });
    setShowAddForm(false);
    toast({
      title: "Equipment Added",
      description: "New equipment has been successfully added to inventory.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800";
      case "Maintenance Required":
        return "bg-orange-100 text-orange-800";
      case "Out of Service":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Equipment Management</h2>
          <p className="text-slate-600">Track tools, machinery, and equipment maintenance</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Add New Equipment
            </CardTitle>
            <CardDescription>Register new equipment and tools for tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Equipment Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Echo PB-580T Backpack Blower"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Equipment Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skidsteer">Skidsteer</SelectItem>
                      <SelectItem value="blower">Blower</SelectItem>
                      <SelectItem value="weedeater">Weed Eater</SelectItem>
                      <SelectItem value="chainsaw">Chainsaw</SelectItem>
                      <SelectItem value="crack-machine">Crack Machine</SelectItem>
                      <SelectItem value="sealing-machine">Sealing Machine</SelectItem>
                      <SelectItem value="trailer">Trailer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    placeholder="PB-580T"
                  />
                </div>
                <div>
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                    placeholder="EC24-789012"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    placeholder="2023"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operational">Operational</SelectItem>
                      <SelectItem value="Maintenance Required">Maintenance Required</SelectItem>
                      <SelectItem value="Out of Service">Out of Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Equipment specifications, maintenance notes, etc..."
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload equipment photos</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Choose Files
                </Button>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add Equipment
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
        {equipment.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center ml-2">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Model:</span>
                  <p className="font-medium">{item.model}</p>
                </div>
                <div>
                  <span className="text-gray-600">Year:</span>
                  <p className="font-medium">{item.year}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Serial:</span>
                  <p className="font-mono text-xs">{item.serialNumber}</p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Maintenance Schedule</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Service:</span>
                    <span>{item.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Next Service:</span>
                    <span className="font-medium">{item.nextMaintenance}</span>
                  </div>
                </div>
              </div>

              {item.notes && (
                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <FileText className="w-3 h-3 mr-1" />
                  Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Service
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipmentManagement;
