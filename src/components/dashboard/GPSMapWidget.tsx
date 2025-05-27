
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import EmployeeMap from "../EmployeeMap";

const GPSMapWidget = () => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Real-Time Employee GPS Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 overflow-hidden">
          <EmployeeMap />
        </div>
      </CardContent>
    </Card>
  );
};

export default GPSMapWidget;
