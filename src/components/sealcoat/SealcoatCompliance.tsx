
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Scale, FileText, Shield } from "lucide-react";

const SealcoatCompliance = () => {
  const virginiaRequirements = [
    {
      requirement: "Material Testing",
      status: "compliant",
      description: "VDOT approved sealcoat materials only",
      reference: "VDOT Section 309.02"
    },
    {
      requirement: "Environmental Protection",
      status: "compliant", 
      description: "Proper containment and disposal procedures",
      reference: "Virginia DEQ Guidelines"
    },
    {
      requirement: "Traffic Control",
      status: "warning",
      description: "MUTCD compliant traffic control devices required",
      reference: "VDOT Traffic Control Manual"
    },
    {
      requirement: "Worker Safety",
      status: "compliant",
      description: "OSHA safety protocols for hot materials",
      reference: "29 CFR 1926.95"
    }
  ];

  const federalRequirements = [
    {
      requirement: "EPA Compliance",
      status: "compliant",
      description: "VOC emissions within federal limits",
      reference: "40 CFR Part 59"
    },
    {
      requirement: "OSHA Safety Standards",
      status: "compliant",
      description: "Personal protective equipment requirements",
      reference: "29 CFR 1926"
    },
    {
      requirement: "DOT Specifications",
      status: "compliant",
      description: "Federal highway sealcoat standards",
      reference: "FHWA Technical Bulletins"
    },
    {
      requirement: "Material Standards",
      status: "warning",
      description: "ASTM testing and certification required",
      reference: "ASTM D2939, D2397, D6690"
    }
  ];

  const permitRequirements = [
    "Business License - Virginia SCC",
    "Contractor License - DPOR",
    "Environmental Permit - DEQ",
    "Traffic Control Permit - VDOT",
    "Workers Compensation Insurance",
    "General Liability Insurance ($1M minimum)"
  ];

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Sealcoat operations require strict compliance with Virginia and Federal regulations. 
          Regular training and certification updates are mandatory.
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Required Permits and Licenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permitRequirements.map((permit, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">{permit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Safety and Environmental Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Safety Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li>• Proper ventilation during application</li>
                <li>• Personal protective equipment (PPE)</li>
                <li>• Hot material handling procedures</li>
                <li>• Emergency response protocols</li>
                <li>• Regular safety training updates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Environmental Protection</h3>
              <ul className="space-y-2 text-sm">
                <li>• Storm drain protection measures</li>
                <li>• Proper material storage and handling</li>
                <li>• Waste disposal compliance</li>
                <li>• Air quality monitoring</li>
                <li>• Spill prevention and cleanup</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SealcoatCompliance;
