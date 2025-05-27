
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, MapPin, FileText, Thermometer } from "lucide-react";

const SealcoatProjectManagement = () => {
  const projects = [
    {
      id: 1,
      name: "Westfield Shopping Center",
      location: "Richmond, VA",
      area: "45,000 sq ft",
      status: "In Progress",
      completion: 75,
      type: "Coal Tar Emulsion",
      weather_window: "72°F - 85°F",
      cure_time: "24-48 hours",
      cost_estimate: "$12,500"
    },
    {
      id: 2,
      name: "Office Complex Parking",
      location: "Norfolk, VA", 
      area: "28,000 sq ft",
      status: "Planning",
      completion: 25,
      type: "Asphalt Emulsion",
      weather_window: "65°F - 80°F",
      cure_time: "12-24 hours",
      cost_estimate: "$8,200"
    },
    {
      id: 3,
      name: "Residential Community",
      location: "Virginia Beach, VA",
      area: "35,000 sq ft",
      status: "Completed",
      completion: 100,
      type: "Polymer Modified",
      weather_window: "70°F - 85°F",
      cure_time: "6-12 hours",
      cost_estimate: "$15,800"
    }
  ];

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {project.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3" />
                  {project.location} • {project.area}
                </CardDescription>
              </div>
              <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <div className="text-sm text-gray-600">Sealcoat Type</div>
                <div className="font-medium">{project.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Weather Window</div>
                <div className="font-medium flex items-center gap-1">
                  <Thermometer className="w-3 h-3" />
                  {project.weather_window}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Cure Time</div>
                <div className="font-medium">{project.cure_time}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Progress</div>
                <div className="font-medium">{project.completion}%</div>
                <Progress value={project.completion} className="h-2 mt-1" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="w-3 h-3 mr-1" />
                  Details
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  Map
                </Button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">Cost Estimate</div>
              <div className="text-lg font-bold text-green-600">{project.cost_estimate}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SealcoatProjectManagement;
