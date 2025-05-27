
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Settings, Ruler, Wrench } from "lucide-react";

const AsphaltRepairSpecifications = () => {
  const mixTypes = [
    {
      type: "Hot Mix Asphalt (HMA)",
      federal_std: "ASTM D3515",
      virginia_std: "VDOT Section 211",
      temperature: "275°F - 325°F",
      compaction: "95% density",
      thickness: "1.5\" - 6\" lifts",
      applications: "Major repairs, overlays"
    },
    {
      type: "Warm Mix Asphalt (WMA)",
      federal_std: "ASTM D8121",
      virginia_std: "VDOT Section 211.03",
      temperature: "200°F - 250°F",
      compaction: "92% density",
      thickness: "1\" - 4\" lifts",
      applications: "Medium repairs, patches"
    },
    {
      type: "Cold Mix Asphalt",
      federal_std: "ASTM D4215",
      virginia_std: "VDOT Section 308",
      temperature: "Ambient temperature",
      compaction: "90% density",
      thickness: "2\" - 8\" lifts",
      applications: "Temporary repairs, winter work"
    }
  ];

  const repairMethods = [
    {
      method: "Full Depth Patching",
      description: "Complete removal and replacement",
      minimum_depth: "6 inches",
      typical_uses: "Severe structural damage"
    },
    {
      method: "Partial Depth Patching",
      description: "Surface layer replacement only",
      minimum_depth: "2 inches",
      typical_uses: "Surface deterioration"
    },
    {
      method: "Mill and Fill",
      description: "Remove surface, replace with new",
      minimum_depth: "1.5 inches",
      typical_uses: "Resurfacing, leveling"
    },
    {
      method: "Crack Sealing",
      description: "Seal cracks to prevent water infiltration",
      minimum_depth: "Surface treatment",
      typical_uses: "Preventive maintenance"
    }
  ];

  const gradingRequirements = [
    {
      sieve_size: "1\"",
      percent_passing: "100%",
      tolerance: "±0%"
    },
    {
      sieve_size: "3/4\"",
      percent_passing: "90-100%",
      tolerance: "±8%"
    },
    {
      sieve_size: "1/2\"",
      percent_passing: "70-85%",
      tolerance: "±8%"
    },
    {
      sieve_size: "#4",
      percent_passing: "45-65%",
      tolerance: "±8%"
    },
    {
      sieve_size: "#200",
      percent_passing: "2-8%",
      tolerance: "±2%"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Asphalt Mix Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mixTypes.map((mix, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">{mix.type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Standards</div>
                    <div className="space-y-1">
                      <Badge variant="outline">{mix.federal_std}</Badge>
                      <Badge variant="outline">{mix.virginia_std}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Application Specs</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3" />
                        Temp: {mix.temperature}
                      </div>
                      <div className="flex items-center gap-1">
                        <Wrench className="w-3 h-3" />
                        Compaction: {mix.compaction}
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        Thickness: {mix.thickness}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Typical Applications</div>
                    <div className="font-medium">{mix.applications}</div>
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
            <Wrench className="w-5 h-5" />
            Repair Methods and Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {repairMethods.map((method, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{method.method}</h3>
                  <Badge variant="outline">{method.minimum_depth}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Description</div>
                    <div className="font-medium">{method.description}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Typical Uses</div>
                    <div className="font-medium">{method.typical_uses}</div>
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
            <Ruler className="w-5 h-5" />
            Aggregate Grading Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Sieve Size</th>
                  <th className="border border-gray-300 p-2 text-left">Percent Passing</th>
                  <th className="border border-gray-300 p-2 text-left">Tolerance</th>
                </tr>
              </thead>
              <tbody>
                {gradingRequirements.map((req, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 font-medium">{req.sieve_size}</td>
                    <td className="border border-gray-300 p-2">{req.percent_passing}</td>
                    <td className="border border-gray-300 p-2">{req.tolerance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quality Control and Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Required Tests</h3>
              <ul className="space-y-2 text-sm">
                <li>• Marshall Stability (ASTM D6927)</li>
                <li>• Density Testing (ASTM D2726)</li>
                <li>• Gradation Analysis (ASTM C136)</li>
                <li>• Asphalt Content (ASTM D2172)</li>
                <li>• Temperature Monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Compaction Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li>• Breakdown rolling (steel wheel)</li>
                <li>• Intermediate rolling (pneumatic)</li>
                <li>• Finish rolling (steel wheel)</li>
                <li>• Density verification (nuclear gauge)</li>
                <li>• Joint sealing and compaction</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AsphaltRepairSpecifications;
