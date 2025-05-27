
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Clock, Shield } from "lucide-react";

const SealcoatSpecifications = () => {
  const specifications = [
    {
      category: "Coal Tar Emulsion",
      federal_std: "ASTM D2939",
      virginia_std: "VDOT Section 309",
      coverage: "0.15-0.20 gal/sq yd",
      solids_content: "55-65%",
      viscosity: "75-150 SFS",
      weather_requirements: "Above 50°F, No rain 24hrs"
    },
    {
      category: "Asphalt Emulsion",
      federal_std: "ASTM D2397",
      virginia_std: "VDOT Section 309",
      coverage: "0.12-0.18 gal/sq yd",
      solids_content: "50-60%",
      viscosity: "50-100 SFS",
      weather_requirements: "Above 45°F, No rain 12hrs"
    },
    {
      category: "Polymer Modified",
      federal_std: "ASTM D6690",
      virginia_std: "VDOT Section 309.03",
      coverage: "0.10-0.15 gal/sq yd",
      solids_content: "60-70%",
      viscosity: "100-200 SFS",
      weather_requirements: "Above 55°F, No rain 6hrs"
    }
  ];

  const additives = [
    {
      name: "Sand Aggregate",
      purpose: "Skid Resistance",
      application_rate: "2-4 lbs/gal",
      federal_spec: "ASTM C33"
    },
    {
      name: "Rubber Crumb",
      purpose: "Crack Resistance",
      application_rate: "1-2 lbs/gal",
      federal_spec: "ASTM D6114"
    },
    {
      name: "Anti-Skid Additive",
      purpose: "Traction Enhancement",
      application_rate: "3-5 lbs/gal",
      federal_spec: "ASTM D1073"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Sealcoat Material Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {specifications.map((spec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">{spec.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Standards</div>
                      <div className="space-y-1">
                        <Badge variant="outline">{spec.federal_std}</Badge>
                        <Badge variant="outline">{spec.virginia_std}</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Application Specs</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Droplets className="w-3 h-3" />
                          Coverage: {spec.coverage}
                        </div>
                        <div>Solids: {spec.solids_content}</div>
                        <div>Viscosity: {spec.viscosity}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Weather Requirements</div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3" />
                        {spec.weather_requirements}
                      </div>
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
              <Droplets className="w-5 h-5" />
              Additives and Aggregates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {additives.map((additive, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{additive.name}</h3>
                    <Badge>{additive.federal_spec}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Purpose</div>
                      <div className="font-medium">{additive.purpose}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Application Rate</div>
                      <div className="font-medium">{additive.application_rate}</div>
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
              <Clock className="w-5 h-5" />
              Application Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Surface Preparation</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Clean surface of debris and vegetation</li>
                  <li>• Fill cracks larger than 1/4 inch</li>
                  <li>• Prime oil-stained areas</li>
                  <li>• Ensure surface is completely dry</li>
                  <li>• Block traffic access</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Application Process</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Apply at manufacturer recommended rate</li>
                  <li>• Use proper spray equipment</li>
                  <li>• Maintain consistent application speed</li>
                  <li>• Apply in thin, even coats</li>
                  <li>• Allow proper cure time before traffic</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SealcoatSpecifications;
