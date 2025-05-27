
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Settings, Calendar, Thermometer } from "lucide-react";

const AsphaltRepairEquipment = () => {
  const majorEquipment = [
    {
      id: "AP-001",
      name: "Asphalt Paver",
      type: "Track Paver",
      width: "8-12 feet",
      capacity: "600 tons/hour",
      heating: "Infrared heaters",
      status: "operational",
      last_maintenance: "2024-01-15",
      next_maintenance: "2024-04-15"
    },
    {
      id: "AR-001", 
      name: "Asphalt Roller (Steel)",
      type: "Double Drum Roller",
      width: "5 feet",
      weight: "10 tons",
      vibration: "Variable frequency",
      status: "operational",
      last_maintenance: "2024-01-20",
      next_maintenance: "2024-04-20"
    },
    {
      id: "AR-002",
      name: "Pneumatic Roller",
      type: "9-Wheel Roller",
      width: "7 feet",
      weight: "12 tons",
      tire_pressure: "Variable 80-120 PSI",
      status: "maintenance",
      last_maintenance: "2024-01-10",
      next_maintenance: "2024-04-10"
    },
    {
      id: "MP-001",
      name: "Milling Machine",
      type: "Cold Planer",
      width: "6 feet",
      depth: "12 inches max",
      production: "400 tons/hour",
      status: "operational",
      last_maintenance: "2024-01-25",
      next_maintenance: "2024-04-25"
    }
  ];

  const supportEquipment = [
    {
      category: "Material Handling",
      items: [
        "Asphalt distributor truck",
        "Hot mix delivery trucks", 
        "Material transfer vehicle",
        "Tack coat applicator"
      ]
    },
    {
      category: "Preparation Tools",
      items: [
        "Jackhammers",
        "Saw cutting equipment",
        "Surface cleaning tools",
        "Edge preparation tools"
      ]
    },
    {
      category: "Testing Equipment",
      items: [
        "Nuclear density gauge",
        "Core drill equipment",
        "Temperature monitoring",
        "Thickness measurement tools"
      ]
    },
    {
      category: "Safety Equipment",
      items: [
        "Traffic control devices",
        "Warning lights and signs",
        "Personal protective equipment",
        "Emergency response kit"
      ]
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Major Asphalt Equipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {majorEquipment.map((item) => (
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
                    <div className="text-sm text-gray-600">Width/Size</div>
                    <div className="font-medium">{item.width}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      {item.capacity ? 'Capacity' : item.weight ? 'Weight' : 'Depth'}
                    </div>
                    <div className="font-medium">
                      {item.capacity || item.weight || item.depth}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Special Features</div>
                    <div className="font-medium">
                      {item.heating || item.vibration || item.tire_pressure || item.production}
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
            <Settings className="w-5 h-5" />
            Support Equipment and Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportEquipment.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
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
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Temperature Management Equipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Hot Mix Equipment</h3>
              <ul className="space-y-2 text-sm">
                <li>• Asphalt plant heating system</li>
                <li>• Heated storage silos</li>
                <li>• Insulated delivery trucks</li>
                <li>• Infrared thermometers</li>
                <li>• Temperature monitoring systems</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Heating and Warming</h3>
              <ul className="space-y-2 text-sm">
                <li>• Infrared heaters</li>
                <li>• Hot air blowers</li>
                <li>• Steam heating units</li>
                <li>• Propane torches</li>
                <li>• Heated hand tools</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Monitoring Tools</h3>
              <ul className="space-y-2 text-sm">
                <li>• Digital thermometers</li>
                <li>• Thermal imaging cameras</li>
                <li>• Data logging systems</li>
                <li>• Weather monitoring stations</li>
                <li>• Quality control software</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AsphaltRepairEquipment;
