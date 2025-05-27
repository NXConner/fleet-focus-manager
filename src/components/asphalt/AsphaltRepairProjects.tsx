
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, MapPin, FileText, Thermometer, Ruler } from "lucide-react";

const AsphaltRepairProjects = () => {
  const projects = [
    {
      id: 1,
      name: "Main Street Pothole Repair",
      location: "Richmond, VA",
      area: "2,500 sq ft",
      repair_type: "Hot Mix Asphalt Patching",
      depth: "4-6 inches",
      status: "In Progress",
      completion: 60,
      temperature_req: "Above 50°F",
      compaction: "95% density",
      cost_estimate: "$18,500"
    },
    {
      id: 2,
      name: "Shopping Center Overlay",
      location: "Norfolk, VA", 
      area: "12,000 sq ft",
      repair_type: "Mill and Overlay",
      depth: "2 inches",
      status: "Planning",
      completion: 20,
      temperature_req: "Above 40°F",
      compaction: "92% density",
      cost_estimate: "$45,200"
    },
    {
      id: 3,
      name: "Parking Lot Crack Sealing",
      location: "Virginia Beach, VA",
      area: "8,000 sq ft",
      repair_type: "Crack Sealing",
      depth: "Surface treatment",
      status: "Completed",
      completion: 100,
      temperature_req: "Above 45°F",
      compaction: "N/A",
      cost_estimate: "$12,800"
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
                  <Settings className="w-5 h-5" />
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
                <div className="text-sm text-gray-600">Repair Type</div>
                <div className="font-medium">{project.repair_type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Depth/Thickness</div>
                <div className="font-medium flex items-center gap-1">
                  <Ruler className="w-3 h-3" />
                  {project.depth}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Temperature Req.</div>
                <div className="font-medium flex items-center gap-1">
                  <Thermometer className="w-3 h-3" />
                  {project.temperature_req}
                </div>
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
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Compaction Standard</div>
                <div className="font-medium">{project.compaction}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Cost Estimate</div>
                <div className="text-lg font-bold text-green-600">{project.cost_estimate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AsphaltRepairProjects;
