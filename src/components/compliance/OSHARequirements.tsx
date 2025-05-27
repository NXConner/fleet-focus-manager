
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HardHat, FileText } from "lucide-react";

const OSHARequirements = () => {
  const oshaRequirements = [
    {
      id: 1,
      requirement: "OSHA 10-Hour Construction Safety Training",
      status: "Current",
      expiryDate: "2025-03-15",
      employees: "16/16 certified",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      requirement: "Hazard Communication Standard (HazCom)",
      status: "Current",
      expiryDate: "2025-01-20",
      employees: "16/16 trained",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      requirement: "Personal Protective Equipment (PPE) Training",
      status: "Due Soon",
      expiryDate: "2024-06-10",
      employees: "14/16 current",
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 4,
      requirement: "Fall Protection Training",
      status: "Current",
      expiryDate: "2025-02-28",
      employees: "12/16 certified",
      color: "bg-green-100 text-green-800"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardHat className="w-5 h-5" />
          OSHA Virginia Safety Requirements
        </CardTitle>
        <CardDescription>
          Occupational Safety and Health Administration requirements for Virginia construction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {oshaRequirements.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{req.requirement}</h4>
                <p className="text-sm text-gray-600">Expires: {req.expiryDate}</p>
                <p className="text-sm text-gray-600">{req.employees}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={req.color}>{req.status}</Badge>
                <Button variant="outline" size="sm">
                  <FileText className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OSHARequirements;
