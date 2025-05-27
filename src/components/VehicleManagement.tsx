import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Truck, Calendar, FileText, Camera, Plus, Wrench, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MaintenanceChecklist } from "@/components/MaintenanceChecklist";

const VehicleManagement = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      year: "1995",
      make: "Dodge",
      model: "Dakota Sport",
      color: "Red",
      engine: "Magnum V6",
      fuel: "Gas",
      transmission: "Automatic",
      drive: "2WD (Rear)",
      vin: "1B7FL26X5SS123456",
      licensePlate: "VA-123-ABC",
      registration: "03/15/2024",
      lastOilChange: "90,000",
      nextOilChange: "93,000",
      oilType: "5W-30",
      oilAmount: "5 quarts",
      plugSize: "14mm",
      tireSize: "P235/75R15",
      maintenanceScore: 85
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    color: "",
    engine: "",
    fuel: "",
    transmission: "",
    drive: "",
    vin: "",
    licensePlate: "",
    registration: "",
    lastOilChange: "",
    nextOilChange: "",
    oilType: "",
    oilAmount: "",
    plugSize: "",
    tireSize: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle = {
      id: vehicles.length + 1,
      ...formData,
      maintenanceScore: 100
    };
    setVehicles([...vehicles, newVehicle]);
    setFormData({
      year: "",
      make: "",
      model: "",
      color: "",
      engine: "",
      fuel: "",
      transmission: "",
      drive: "",
      vin: "",
      licensePlate: "",
      registration: "",
      lastOilChange: "",
      nextOilChange: "",
      oilType: "",
      oilAmount: "",
      plugSize: "",
      tireSize: "",
      notes: ""
    });
    setShowAddForm(false);
    toast({
      title: "Vehicle Added",
      description: "New vehicle has been successfully added to the fleet.",
    });
  };

  const getMaintenanceScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">
            Vehicle Management
          </h2>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
            Manage your fleet vehicles and maintenance records
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-blue-200 dark:border-blue-800 shadow-xl animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Add New Vehicle
            </CardTitle>
            <CardDescription>Enter comprehensive vehicle information and maintenance details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="registration">Registration</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        placeholder="1995"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="make">Make</Label>
                      <Input
                        id="make"
                        value={formData.make}
                        onChange={(e) => setFormData({...formData, make: e.target.value})}
                        placeholder="Dodge"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        placeholder="Dakota Sport"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        value={formData.color}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                        placeholder="Red"
                      />
                    </div>
                    <div>
                      <Label htmlFor="engine">Engine</Label>
                      <Input
                        id="engine"
                        value={formData.engine}
                        onChange={(e) => setFormData({...formData, engine: e.target.value})}
                        placeholder="Magnum V6"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="fuel">Fuel Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, fuel: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gas">Gas</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select onValueChange={(value) => setFormData({...formData, transmission: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="drive">Drive Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, drive: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select drive type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2wd-rear">2WD (Rear)</SelectItem>
                          <SelectItem value="2wd-front">2WD (Front)</SelectItem>
                          <SelectItem value="4wd">4WD</SelectItem>
                          <SelectItem value="awd">AWD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="registration" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vin">VIN Number</Label>
                      <Input
                        id="vin"
                        value={formData.vin}
                        onChange={(e) => setFormData({...formData, vin: e.target.value})}
                        placeholder="1B7FL26X5SS123456"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="licensePlate">License Plate</Label>
                      <Input
                        id="licensePlate"
                        value={formData.licensePlate}
                        onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                        placeholder="VA-123-ABC"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registration">Registration Renewal Date</Label>
                    <Input
                      id="registration"
                      type="date"
                      value={formData.registration}
                      onChange={(e) => setFormData({...formData, registration: e.target.value})}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lastOilChange">Last Oil Change (Mileage)</Label>
                      <Input
                        id="lastOilChange"
                        value={formData.lastOilChange}
                        onChange={(e) => setFormData({...formData, lastOilChange: e.target.value})}
                        placeholder="90,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nextOilChange">Next Oil Change (Mileage)</Label>
                      <Input
                        id="nextOilChange"
                        value={formData.nextOilChange}
                        onChange={(e) => setFormData({...formData, nextOilChange: e.target.value})}
                        placeholder="93,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="oilType">Oil Type</Label>
                      <Input
                        id="oilType"
                        value={formData.oilType}
                        onChange={(e) => setFormData({...formData, oilType: e.target.value})}
                        placeholder="5W-30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="oilAmount">Oil Amount</Label>
                      <Input
                        id="oilAmount"
                        value={formData.oilAmount}
                        onChange={(e) => setFormData({...formData, oilAmount: e.target.value})}
                        placeholder="5 quarts"
                      />
                    </div>
                    <div>
                      <Label htmlFor="plugSize">Oil Plug Size</Label>
                      <Input
                        id="plugSize"
                        value={formData.plugSize}
                        onChange={(e) => setFormData({...formData, plugSize: e.target.value})}
                        placeholder="14mm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tireSize">Tire Size</Label>
                    <Input
                      id="tireSize"
                      value={formData.tireSize}
                      onChange={(e) => setFormData({...formData, tireSize: e.target.value})}
                      placeholder="P235/75R15"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Maintenance Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Additional maintenance notes and observations..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center transition-colors duration-300 hover:border-blue-400">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Upload vehicle photos</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Drag and drop images or click to browse</p>
                    <Button type="button" variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                  Add Vehicle
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
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-slate-800 dark:text-slate-100">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {vehicle.color}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {vehicle.engine}
                    </Badge>
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Maintenance Score:</span>
                    <Badge className={`text-xs ${getMaintenanceScoreColor(vehicle.maintenanceScore)}`}>
                      {vehicle.maintenanceScore}%
                    </Badge>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">VIN:</span>
                  <p className="font-mono text-xs">{vehicle.vin}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">License:</span>
                  <p className="font-medium">{vehicle.licensePlate}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Registration:</span>
                  <p className="font-medium">{vehicle.registration}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Tire Size:</span>
                  <p className="font-medium">{vehicle.tireSize}</p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Oil Change Info</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Last:</span> {vehicle.lastOilChange} mi
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Next:</span> {vehicle.nextOilChange} mi
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Type:</span> {vehicle.oilType}
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Amount:</span> {vehicle.oilAmount}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 transition-all duration-200 hover:scale-105">
                  <FileText className="w-3 h-3 mr-1" />
                  Details
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 transition-all duration-200 hover:scale-105"
                      onClick={() => setSelectedVehicle(vehicle.id)}
                    >
                      <Wrench className="w-3 h-3 mr-1" />
                      Maintenance
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5" />
                        Maintenance Checklist - {vehicle.year} {vehicle.make} {vehicle.model}
                      </DialogTitle>
                      <DialogDescription>
                        Comprehensive maintenance tracking and records
                      </DialogDescription>
                    </DialogHeader>
                    {selectedVehicle && <MaintenanceChecklist vehicleId={selectedVehicle} />}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleManagement;
