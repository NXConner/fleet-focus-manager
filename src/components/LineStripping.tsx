
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Car, 
  Ruler, 
  Palette, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Calculator,
  MapPin,
  PaintBucket,
  Building,
  Users
} from "lucide-react";

const LineStripping = () => {
  const [selectedProject, setSelectedProject] = useState("standard");
  const [measurements, setMeasurements] = useState({
    length: "",
    width: "",
    spaces: ""
  });

  // Virginia & Federal ADA Standards
  const adaStandards = {
    standardSpace: {
      width: "9 feet minimum",
      length: "18 feet minimum", 
      accessible: "8 feet wide with 5-foot access aisle"
    },
    lineWidth: "4 inches standard, 6 inches for crosswalks",
    colors: {
      white: "Standard parking spaces, lane markings",
      yellow: "No parking zones, fire lanes, curbs",
      blue: "Handicap accessible spaces only",
      red: "Fire lanes, emergency access"
    }
  };

  // Virginia DOT Paint Specifications
  const paintSpecs = [
    {
      type: "Water-Based Acrylic",
      use: "Standard parking lots",
      durability: "2-3 years",
      cost: "$0.15-0.25/sq ft",
      vaCompliant: true
    },
    {
      type: "Solvent-Based Alkyd",
      use: "High-traffic areas",
      durability: "3-5 years", 
      cost: "$0.25-0.35/sq ft",
      vaCompliant: true
    },
    {
      type: "Thermoplastic",
      use: "Long-term/highways",
      durability: "5-8 years",
      cost: "$0.50-0.75/sq ft",
      vaCompliant: true
    }
  ];

  // Current Projects
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

  const calculateMaterials = () => {
    const length = parseFloat(measurements.length) || 0;
    const width = parseFloat(measurements.width) || 0;
    const spaces = parseInt(measurements.spaces) || 0;
    
    const totalArea = length * width;
    const paintNeeded = (spaces * 4 * 18 * 4) / 144; // sq ft of paint
    const estimatedCost = paintNeeded * 0.25; // avg cost per sq ft
    
    return {
      totalArea: totalArea.toFixed(0),
      paintNeeded: paintNeeded.toFixed(0),
      estimatedCost: estimatedCost.toFixed(2)
    };
  };

  const calculations = calculateMaterials();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Line Stripping & Parking Lot Management</h2>
          <p className="text-slate-600">Virginia & Federal Standards Compliance</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50">
            <Shield className="w-3 h-3 mr-1" />
            VA Licensed PAV Specialist
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Generate Quote
          </Button>
        </div>
      </div>

      {/* Current Projects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {project.name}
                <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {project.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Parking Spaces:</span>
                  <span className="font-medium">{project.spaces}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Type:</span>
                  <span className="font-medium">{project.type}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress:</span>
                    <span className="font-medium">{project.completion}%</span>
                  </div>
                  <Progress value={project.completion} className="h-2" />
                </div>
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  Standards: {project.standards}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Parking Lot Calculator
          </CardTitle>
          <CardDescription>
            Calculate materials and costs for Virginia projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="length">Length (ft)</Label>
              <Input
                id="length"
                value={measurements.length}
                onChange={(e) => setMeasurements({...measurements, length: e.target.value})}
                placeholder="300"
              />
            </div>
            <div>
              <Label htmlFor="width">Width (ft)</Label>
              <Input
                id="width"
                value={measurements.width}
                onChange={(e) => setMeasurements({...measurements, width: e.target.value})}
                placeholder="200"
              />
            </div>
            <div>
              <Label htmlFor="spaces">Parking Spaces</Label>
              <Input
                id="spaces"
                value={measurements.spaces}
                onChange={(e) => setMeasurements({...measurements, spaces: e.target.value})}
                placeholder="100"
              />
            </div>
            <div className="flex flex-col justify-end">
              <div className="space-y-2 text-sm">
                <div>Total Area: {calculations.totalArea} sq ft</div>
                <div>Paint Needed: {calculations.paintNeeded} sq ft</div>
                <div className="font-bold text-green-600">Est. Cost: ${calculations.estimatedCost}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="standards" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="standards">VA Standards</TabsTrigger>
          <TabsTrigger value="federal">Federal ADA</TabsTrigger>
          <TabsTrigger value="materials">Paint Specs</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="standards">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Virginia Building Code Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Virginia Code § 36-98.1:</strong> All public parking facilities must comply with USBC accessibility standards.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Standard Parking Space</h4>
                    <p className="text-sm text-gray-600">9' wide × 18' long minimum</p>
                    <p className="text-sm text-gray-600">Lines: 4" wide, white paint</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Accessible Parking</h4>
                    <p className="text-sm text-gray-600">8' space + 5' access aisle</p>
                    <p className="text-sm text-gray-600">Van spaces: 8' + 8' access aisle</p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Fire Lanes</h4>
                    <p className="text-sm text-gray-600">20' minimum width</p>
                    <p className="text-sm text-gray-600">Red curb marking required</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Virginia Paint Color Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(adaStandards.colors).map(([color, use]) => (
                    <div key={color} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div 
                        className={`w-6 h-6 rounded border-2 ${
                          color === 'white' ? 'bg-white border-gray-400' :
                          color === 'yellow' ? 'bg-yellow-400' :
                          color === 'blue' ? 'bg-blue-500' :
                          'bg-red-500'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="font-medium capitalize">{color}</div>
                        <div className="text-sm text-gray-600">{use}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="federal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Federal ADA Compliance Requirements
              </CardTitle>
              <CardDescription>
                Americans with Disabilities Act Standards for Accessible Design
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Required Accessible Spaces</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1-25 spaces:</span>
                      <span className="font-medium">1 accessible space</span>
                    </div>
                    <div className="flex justify-between">
                      <span>26-50 spaces:</span>
                      <span className="font-medium">2 accessible spaces</span>
                    </div>
                    <div className="flex justify-between">
                      <span>51-75 spaces:</span>
                      <span className="font-medium">3 accessible spaces</span>
                    </div>
                    <div className="flex justify-between">
                      <span>76-100 spaces:</span>
                      <span className="font-medium">4 accessible spaces</span>
                    </div>
                    <div className="flex justify-between">
                      <span>101-150 spaces:</span>
                      <span className="font-medium">5 accessible spaces</span>
                    </div>
                  </div>
                  
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Note:</strong> 1 in 6 accessible spaces must be van-accessible
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Signage Requirements</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium">International Symbol of Accessibility</h5>
                      <p className="text-sm text-gray-600">Required on all accessible spaces</p>
                      <p className="text-sm text-gray-600">Sign height: 60" minimum</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-medium">Van Accessible Signage</h5>
                      <p className="text-sm text-gray-600">"Van Accessible" designation required</p>
                      <p className="text-sm text-gray-600">Below accessibility symbol</p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="font-medium">Penalty Signage</h5>
                      <p className="text-sm text-gray-600">Virginia fine: $100-500</p>
                      <p className="text-sm text-gray-600">Federal fine: Up to $55,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PaintBucket className="w-5 h-5" />
                Virginia DOT Approved Paint Specifications
              </CardTitle>
              <CardDescription>
                Approved materials for state and municipal projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paintSpecs.map((spec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{spec.type}</h4>
                      {spec.vaCompliant && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          VA DOT Approved
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Best Use:</span>
                        <p className="font-medium">{spec.use}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Durability:</span>
                        <p className="font-medium">{spec.durability}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cost Range:</span>
                        <p className="font-medium text-green-600">{spec.cost}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Weather:</span>
                        <p className="font-medium">45°F+ for application</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Important:</strong> All paint must meet VDOT specifications and be lead-free. Glass beads required for night visibility on roadways.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="measurements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Standard Measurements & Spacing
              </CardTitle>
              <CardDescription>
                Virginia and federal requirements for parking lot layout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Parking Space Dimensions</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">Standard Spaces</div>
                      <div className="text-sm text-gray-600">9' × 18' minimum</div>
                      <div className="text-sm text-gray-600">Preferred: 9' × 20'</div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Accessible Spaces</div>
                      <div className="text-sm text-gray-600">8' × 18' + 5' aisle</div>
                      <div className="text-sm text-gray-600">Total width: 13'</div>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="font-medium">Van Accessible</div>
                      <div className="text-sm text-gray-600">8' × 18' + 8' aisle</div>
                      <div className="text-sm text-gray-600">Total width: 16'</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Drive Aisle Widths</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">90° Parking</div>
                      <div className="text-sm text-gray-600">24' minimum width</div>
                      <div className="text-sm text-gray-600">26' preferred</div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">60° Angled</div>
                      <div className="text-sm text-gray-600">18' minimum width</div>
                      <div className="text-sm text-gray-600">20' preferred</div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">45° Angled</div>
                      <div className="text-sm text-gray-600">13' minimum width</div>
                      <div className="text-sm text-gray-600">15' preferred</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Line Specifications</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="font-medium">Parking Lines</div>
                      <div className="text-sm text-gray-600">4" wide standard</div>
                      <div className="text-sm text-gray-600">White paint</div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Crosswalks</div>
                      <div className="text-sm text-gray-600">6" wide minimum</div>
                      <div className="text-sm text-gray-600">White with reflective beads</div>
                    </div>
                    
                    <div className="bg-red-50 p-3 rounded">
                      <div className="font-medium">Fire Lanes</div>
                      <div className="text-sm text-gray-600">Red paint or striping</div>
                      <div className="text-sm text-gray-600">20' minimum width</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LineStripping;
