
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, Truck, Settings, Calendar } from "lucide-react";

const SealcoatEquipment = () => {
  const equipment = [
    {
      id: "SC-001",
      name: "Sealcoat Spray System 1",
      type: "Truck-mounted Sprayer",
      capacity: "1,000 gallons",
      pump_type: "Centrifugal",
      spray_width: "8-12 feet",
      status: "operational",
      last_maintenance: "2024-01-15",
      next_maintenance: "2024-04-15"
    },
    {
      id: "SC-002", 
      name: "Sealcoat Spray System 2",
      type: "Trailer-mounted Sprayer",
      capacity: "500 gallons",
      pump_type: "Diaphragm",
      spray_width: "6-10 feet",
      status: "maintenance",
      last_maintenance: "2024-01-10",
      next_maintenance: "2024-04-10"
    },
    {
      id: "AG-001",
      name: "Aggregate Spreader",
      type: "Self-propelled Spreader",
      capacity: "2 cubic yards",
      spread_width: "12 feet",
      application_rate: "Variable",
      status: "operational",
      last_maintenance: "2024-01-20",
      next_maintenance: "2024-04-20"
    }
  ];

  const supportEquipment = [
    {
      name: "Crack Cleaning Equipment",
      items: ["Wire brushes", "Compressed air", "Routing tools"]
    },
    {
      name: "Surface Preparation",
      items: ["Power brooms", "Pressure washers", "Crack sealers"]
    },
    {
      name: "Traffic Control",
      items: ["Cones", "Barricades", "Warning signs", "Flaggers"]
    },
    {
      name: "Safety Equipment",
      items: ["Hard hats", "Safety vests", "Respirators", "Eye protection"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'out_of_service': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Sealcoat Application Equipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipment.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.type} • {item.id}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Capacity</div>
                      <div className="font-medium">{item.capacity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {item.pump_type ? 'Pump Type' : 'Spread Width'}
                      </div>
                      <div className="font-medium">
                        {item.pump_type || item.spread_width}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {item.spray_width ? 'Spray Width' : 'Application Rate'}
                      </div>
                      <div className="font-medium">
                        {item.spray_width || item.application_rate}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3 mr-1" />
                        Service
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Last Maintenance</div>
                      <div className="font-medium">{item.last_maintenance}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Next Maintenance</div>
                      <div className="font-medium">{item.next_maintenance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Support Equipment and Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportEquipment.map((category, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipment Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-green-600">Daily Checks</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Fluid levels inspection</li>
                    <li>• Hose and fitting check</li>
                    <li>• Spray pattern test</li>
                    <li>• Safety equipment verification</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-600">Weekly Maintenance</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Pump calibration</li>
                    <li>• Filter cleaning/replacement</li>
                    <li>• Tank cleaning</li>
                    <li>• Equipment lubrication</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-red-600">Seasonal Service</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Complete system overhaul</li>
                    <li>• Pump rebuild/replacement</li>
                    <li>• Hose and seal replacement</li>
                    <li>• Calibration certification</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SealcoatEquipment;
