
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Scale, FileText, Shield } from "lucide-react";

const AsphaltRepairCompliance = () => {
  const virginiaRequirements = [
    {
      requirement: "VDOT Material Approval",
      status: "compliant",
      description: "All asphalt mixes must be VDOT approved",
      reference: "VDOT Section 211.02"
    },
    {
      requirement: "Contractor Certification",
      status: "compliant", 
      description: "Certified asphalt paving contractor required",
      reference: "DPOR License Requirements"
    },
    {
      requirement: "Traffic Control Plan",
      status: "warning",
      description: "MUTCD compliant traffic control required",
      reference: "VDOT Traffic Control Manual"
    },
    {
      requirement: "Environmental Compliance",
      status: "compliant",
      description: "Storm water pollution prevention",
      reference: "Virginia DEQ Permit"
    }
  ];

  const federalRequirements = [
    {
      requirement: "OSHA Safety Standards",
      status: "compliant",
      description: "Hot asphalt safety protocols",
      reference: "29 CFR 1926.95"
    },
    {
      requirement: "EPA Air Quality",
      status: "compliant",
      description: "Emissions control during heating",
      reference: "40 CFR Part 60"
    },
    {
      requirement: "DOT Material Standards",
      status: "compliant",
      description: "Federal highway specifications",
      reference: "FHWA MP-19"
    },
    {
      requirement: "ASTM Testing Protocols",
      status: "warning",
      description: "Material testing and quality assurance",
      reference: "ASTM D6927, D2726, C136"
    }
  ];

  const safetyRequirements = [
    "Hot material handling procedures",
    "Personal protective equipment (PPE)",
    "Confined space entry protocols",
    "Equipment safety inspections",
    "Emergency response procedures",
    "First aid and burn treatment"
  ];

  const qualityAssurance = [
    "Pre-construction material testing",
    "In-process quality control",
    "Density and compaction verification",
    "Temperature monitoring and recording",
    "Final inspection and acceptance",
    "Documentation and reporting"
  ];

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Asphalt repair operations involve high-temperature materials and require strict safety protocols. 
          All personnel must be trained in hot asphalt handling procedures.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Virginia State Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {virginiaRequirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  {req.status === 'compliant' ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{req.requirement}</div>
                    <div className="text-sm text-gray-600">{req.description}</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {req.reference}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Federal Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {federalRequirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  {req.status === 'compliant' ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{req.requirement}</div>
                    <div className="text-sm text-gray-600">{req.description}</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {req.reference}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {safetyRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Quality Assurance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {qualityAssurance.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Temperature and Weather Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-red-600">Hot Mix Asphalt</h3>
              <ul className="space-y-2 text-sm">
                <li>• Air temperature: Above 50°F</li>
                <li>• Surface temperature: Above 40°F</li>
                <li>• No precipitation during application</li>
                <li>• Wind speed below 25 mph</li>
                <li>• Material temperature: 275°F-325°F</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-yellow-600">Warm Mix Asphalt</h3>
              <ul className="space-y-2 text-sm">
                <li>• Air temperature: Above 40°F</li>
                <li>• Surface temperature: Above 35°F</li>
                <li>• Light precipitation acceptable</li>
                <li>• Wind speed below 30 mph</li>
                <li>• Material temperature: 200°F-250°F</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-600">Cold Mix Asphalt</h3>
              <ul className="space-y-2 text-sm">
                <li>• Air temperature: Above 32°F</li>
                <li>• Surface temperature: Above 32°F</li>
                <li>• Weather independent application</li>
                <li>• Temporary repair material</li>
                <li>• Material temperature: Ambient</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AsphaltRepairCompliance;
