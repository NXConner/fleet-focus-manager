
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  HardHat,
  Car,
  Scale,
  Building,
  Phone,
  Globe,
  Clock,
  Users,
  Wrench
} from "lucide-react";

const VirginiaCompliance = () => {
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Virginia State Compliance Dashboard</h2>
          <p className="text-muted-foreground">OSHA, VDOT, DMV, and Board of Contractors compliance tracking</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          <Shield className="w-4 h-4 mr-1" />
          Fully Compliant
        </Badge>
      </div>

      <Tabs defaultValue="osha" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="osha" className="flex items-center gap-2">
            <HardHat className="w-4 h-4" />
            OSHA Virginia
          </TabsTrigger>
          <TabsTrigger value="vdot" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            VDOT
          </TabsTrigger>
          <TabsTrigger value="contractors" className="flex items-center gap-2">
            <Scale className="w-4 h-4" />
            VA Contractors
          </TabsTrigger>
          <TabsTrigger value="dmv" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            VA DMV
          </TabsTrigger>
        </TabsList>

        {/* OSHA Virginia Section */}
        <TabsContent value="osha" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardHat className="w-5 h-5" />
                  OSHA Virginia Requirements
                </CardTitle>
                <CardDescription>Current safety standards and training requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">OSHA 10-Hour Construction Safety</h4>
                      <p className="text-sm text-gray-600">Required for all field employees</p>
                    </div>
                    <Badge variant="default">16/16 Certified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">OSHA 30-Hour Construction</h4>
                      <p className="text-sm text-gray-600">Required for supervisors</p>
                    </div>
                    <Badge variant="default">4/4 Certified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Fall Protection Training</h4>
                      <p className="text-sm text-gray-600">Annual requirement</p>
                    </div>
                    <Badge variant="outline">Due: March 2025</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Hazard Communication</h4>
                      <p className="text-sm text-gray-600">SDS and chemical safety</p>
                    </div>
                    <Badge variant="default">Current</Badge>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Virginia follows federal OSHA standards with additional state requirements for construction safety.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Program Documentation</CardTitle>
                <CardDescription>Required OSHA documentation and programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Safety Manual
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    IIPP Program
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Emergency Plan
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Training Records
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Incident Reports
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    PPE Program
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <h4 className="font-medium text-blue-900">Virginia OSHA Contacts</h4>
                  <div className="text-sm text-blue-800 mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      Richmond Area Office: (804) 371-8888
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      Norfolk Area Office: (757) 441-3820
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      www.doli.virginia.gov/safety-health/
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Asphalt Industry Safety Standards</CardTitle>
              <CardDescription>Specific requirements for pavement and sealcoating operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Hot Mix Asphalt Safety</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Heat-resistant PPE required</li>
                    <li>• Burn prevention protocols</li>
                    <li>• Proper ventilation requirements</li>
                    <li>• Equipment safety procedures</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Sealcoating Operations</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Chemical exposure protection</li>
                    <li>• Respiratory protection program</li>
                    <li>• Skin contact prevention</li>
                    <li>• Emergency eyewash stations</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Traffic Control</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• MUTCD compliance required</li>
                    <li>• Flagging certification</li>
                    <li>• High-visibility clothing</li>
                    <li>• Work zone safety training</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VDOT Section */}
        <TabsContent value="vdot" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  VDOT Prequalification Status
                </CardTitle>
                <CardDescription>Virginia Department of Transportation contractor requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Prequalification Certificate</h4>
                      <p className="text-sm text-gray-600">Current through December 2024</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Work Class Authorization</h4>
                      <p className="text-sm text-gray-600">Pavement/Surface Treatment</p>
                    </div>
                    <Badge variant="default">Approved</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">DBE Certification</h4>
                      <p className="text-sm text-gray-600">Disadvantaged Business Enterprise</p>
                    </div>
                    <Badge variant="outline">Eligible</Badge>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Current VDOT prequalification allows bidding on state highway projects up to $2M.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Requirements</CardTitle>
                <CardDescription>VDOT specifications and standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Material Certifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Asphalt Mix Designs:</span>
                      <Badge variant="outline" size="sm">Current</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Aggregate Testing:</span>
                      <Badge variant="outline" size="sm">Current</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>QC/QA Certification:</span>
                      <Badge variant="outline" size="sm">Valid</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Field Technician:</span>
                      <Badge variant="outline" size="sm">Certified</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Equipment Requirements</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Paving Equipment:</span>
                      <span className="text-green-600">✓ Approved</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compaction Equipment:</span>
                      <span className="text-green-600">✓ Approved</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Testing Equipment:</span>
                      <span className="text-green-600">✓ Calibrated</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <h4 className="font-medium text-blue-900">VDOT Contacts</h4>
                  <div className="text-sm text-blue-800 mt-2 space-y-1">
                    <div>Richmond District: (804) 786-2801</div>
                    <div>Hampton Roads District: (757) 494-5400</div>
                    <div>Northern Virginia District: (703) 259-1794</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Virginia Board of Contractors Section */}
        <TabsContent value="contractors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Virginia Contractor License
                </CardTitle>
                <CardDescription>Board for Contractors license and specialty classifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">License Number: 2705123456</h4>
                      <p className="text-sm text-gray-600">Class A Contractor License</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">PAV - Pavement Specialty</h4>
                      <p className="text-sm text-gray-600">Asphalt paving and patching</p>
                    </div>
                    <Badge variant="default">Certified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">License Expiration</h4>
                      <p className="text-sm text-gray-600">April 30, 2025</p>
                    </div>
                    <Badge variant="outline">120 days</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Bond Amount</h4>
                      <p className="text-sm text-gray-600">$50,000 required</p>
                    </div>
                    <Badge variant="default">Current</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PAV Specialty Requirements</CardTitle>
                <CardDescription>Pavement and sealcoating specialty standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <h4 className="font-medium mb-2">PAV Classification Includes:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Hot mix asphalt paving</li>
                      <li>• Cold patch repairs</li>
                      <li>• Crack sealing operations</li>
                      <li>• Surface treatments</li>
                      <li>• Sealcoating applications</li>
                      <li>• Line striping and marking</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <h4 className="font-medium mb-2">Experience Requirements:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Minimum 4 years pavement experience</li>
                      <li>• Documented project history</li>
                      <li>• Financial capability verification</li>
                      <li>• Equipment ownership proof</li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <Building className="h-4 w-4" />
                  <AlertDescription>
                    Virginia Board for Contractors: (804) 367-8511 | www.dpor.virginia.gov/boards/contractors
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Continuing Education & Renewal</CardTitle>
              <CardDescription>Required training and license maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">CE Requirements</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• 8 hours every 2 years</li>
                    <li>• DPOR approved courses</li>
                    <li>• Business/safety focused</li>
                    <li>• Due by license expiration</li>
                  </ul>
                  <Badge variant="default" className="mt-2">6/8 Hours Complete</Badge>
                </div>
                
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Annual Reports</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Financial statements</li>
                    <li>• Insurance verification</li>
                    <li>• Worker's compensation</li>
                    <li>• Project completion list</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">Due: March 2025</Badge>
                </div>
                
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">License Fees</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Class A: $330 biennial</li>
                    <li>• PAV Specialty: $165</li>
                    <li>• Late fee: $165</li>
                    <li>• Reinstatement: $495</li>
                  </ul>
                  <Badge variant="default" className="mt-2">Paid Current</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Virginia DMV Section */}
        <TabsContent value="dmv" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Virginia DMV Requirements
                </CardTitle>
                <CardDescription>Commercial vehicle registration and inspection requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Commercial Vehicle Registrations</h4>
                      <p className="text-sm text-gray-600">12 vehicles registered</p>
                    </div>
                    <Badge variant="default">Current</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Annual Safety Inspections</h4>
                      <p className="text-sm text-gray-600">All vehicles inspected</p>
                    </div>
                    <Badge variant="outline">2 Due Soon</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">CDL Requirements</h4>
                      <p className="text-sm text-gray-600">8 drivers with valid CDLs</p>
                    </div>
                    <Badge variant="default">Compliant</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">IFTA Registration</h4>
                      <p className="text-sm text-gray-600">International Fuel Tax Agreement</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DOT Compliance</CardTitle>
                <CardDescription>Federal and state transportation regulations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <h4 className="font-medium mb-2">USDOT Number: 1234567</h4>
                    <p className="text-sm text-gray-600">Active interstate authority</p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <h4 className="font-medium mb-2">Hours of Service Compliance</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Electronic logging devices (ELD)</li>
                      <li>• Driver duty status monitoring</li>
                      <li>• Rest period compliance</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <h4 className="font-medium mb-2">Drug & Alcohol Testing</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• DOT-compliant testing program</li>
                      <li>• Random testing consortium</li>
                      <li>• MRO services contracted</li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <Car className="h-4 w-4" />
                  <AlertDescription>
                    Virginia DMV: (804) 497-7100 | Commercial Services: dmvNOW.com
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Inspection Schedule</CardTitle>
              <CardDescription>Upcoming inspection dates and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Truck #101</span>
                      <Badge variant="destructive">Due 01/15</Badge>
                    </div>
                    <p className="text-sm text-gray-600">2019 Ford F-550 Dump</p>
                    <p className="text-xs text-gray-500">Last: 01/15/2024</p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Truck #102</span>
                      <Badge variant="outline">Due 02/20</Badge>
                    </div>
                    <p className="text-sm text-gray-600">2020 Chevrolet 3500</p>
                    <p className="text-xs text-gray-500">Last: 02/20/2024</p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Truck #103</span>
                      <Badge variant="default">Current</Badge>
                    </div>
                    <p className="text-sm text-gray-600">2021 Ram 5500</p>
                    <p className="text-xs text-gray-500">Last: 08/15/2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirginiaCompliance;
