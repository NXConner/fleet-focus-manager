
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HardHat, Car, Scale, Building } from "lucide-react";

const ComplianceOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <HardHat className="w-5 h-5 text-orange-600" />
            OSHA Virginia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Compliance:</span>
              <span className="font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
            <div className="text-xs text-orange-700">
              1 training due within 30 days
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            VDOT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Certifications:</span>
              <span className="font-medium">2/3 Current</span>
            </div>
            <Progress value={67} className="h-2" />
            <div className="text-xs text-blue-700">
              QA Certification renewal required
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="w-5 h-5 text-green-600" />
            Board of Contractors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">License Status:</span>
              <span className="font-medium">Active</span>
            </div>
            <Progress value={95} className="h-2" />
            <div className="text-xs text-green-700">
              All licenses current & valid
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="w-5 h-5 text-purple-600" />
            VA DMV
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Fleet Status:</span>
              <span className="font-medium">11/12 Current</span>
            </div>
            <Progress value={91} className="h-2" />
            <div className="text-xs text-purple-700">
              1 inspection due this month
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceOverview;
