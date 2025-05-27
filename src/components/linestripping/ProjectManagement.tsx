
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Car, MapPin, FileText } from "lucide-react";

const ProjectManagement = () => {
  const projects = [
    {
      id: 1,
      name: "Richmond Shopping Center",
      location: "Richmond, VA",
      spaces: 250,
      status: "In Progress",
      completion: 65,
      type: "Retail Parking",
      standards: "ADA + VA Code"
    },
    {
      id: 2,
      name: "Norfolk Business Park",
      location: "Norfolk, VA", 
      spaces: 180,
      status: "Planning",
      completion: 15,
      type: "Commercial",
      standards: "Federal + VDOT"
    },
    {
      id: 3,
      name: "VB Community Center",
      location: "Virginia Beach, VA",
      spaces: 120,
      status: "Completed",
      completion: 100,
      type: "Municipal",
      standards: "ADA Compliant"
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
                  <Car className="w-5 h-5" />
                  {project.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3" />
                  {project.location} • {project.spaces} spaces
                </CardDescription>
              </div>
              <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Project Type</div>
                <div className="font-medium">{project.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Standards</div>
                <div className="font-medium">{project.standards}</div>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectManagement;
