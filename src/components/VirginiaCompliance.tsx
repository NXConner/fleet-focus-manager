import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Car, 
  ExternalLink, 
  Scale, 
  FileText, 
  Building, 
  Calendar,
  HardHat,
  MapPin
} from "lucide-react";
import ComplianceAlerts from "./compliance/ComplianceAlerts";
import OSHARequirements from "./compliance/OSHARequirements";

const VirginiaCompliance = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Virginia State Compliance Dashboard</h2>
          <p className="text-muted-foreground">Track compliance with Virginia state regulations and industry standards</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Shield className="w-4 h-4 mr-1" />
            98% Compliant
          </Badge>
          <Badge variant="destructive" className="text-lg px-3 py-1">
            <AlertTriangle className="w-4 h-4 mr-1" />
            2 Actions Needed
          </Badge>
        </div>
      </div>

      {/* Compliance Alerts */}
      <ComplianceAlerts />

      {/* OSHA Requirements */}
      <OSHARequirements />

      {/* Virginia Department of Transportation (VDOT) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Virginia Department of Transportation (VDOT) Requirements
          </CardTitle>
          <CardDescription>
            Commercial vehicle and transportation regulations for Virginia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="font-medium">Commercial Driver's License (CDL)</h4>
                  <p className="text-sm text-gray-600">Current CDL holders: 8/12 drivers</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Action Needed</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="font-medium">Vehicle Safety Inspections</h4>
                  <p className="text-sm text-gray-600">Annual inspections current</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Current</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="font-medium">Overweight/Oversize Permits</h4>
                  <p className="text-sm text-gray-600">Active permits: 3</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Current</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                VDOT Permits Portal
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                CDL Renewal System
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Vehicle Registration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Virginia Board for Contractors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Virginia Board for Contractors (Paving & Sealcoating)
          </CardTitle>
          <CardDescription>
            Professional licensing and specialty contractor requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Class A Contractor License</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">License #:</span>
                    <span className="text-sm font-medium">2701-123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expires:</span>
                    <span className="text-sm">04/30/2025</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 w-full justify-center">Active</Badge>
                </div>
              </div>
              
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Paving Specialty (PAV)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Classification:</span>
                    <span className="text-sm font-medium">PAV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Max Contract:</span>
                    <span className="text-sm">$2,000,000</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 w-full justify-center">Qualified</Badge>
                </div>
              </div>
              
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Sealcoating Specialty</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Certification:</span>
                    <span className="text-sm font-medium">Current</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Insurance:</span>
                    <span className="text-sm">$1M General</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 w-full justify-center">Compliant</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View License Details
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Board Portal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Virginia Department of Motor Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Virginia Department of Motor Vehicles (DMV)
          </CardTitle>
          <CardDescription>
            Commercial vehicle registration and compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Fleet Registration Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 border rounded">
                    <span>Commercial Trucks (16)</span>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>Equipment Trailers (8)</span>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>Utility Vehicles (4)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Expires Soon</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">IRP & IFTA Compliance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 border rounded">
                    <span>IRP Registration</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>IFTA Quarterly Filing</span>
                    <Badge className="bg-green-100 text-green-800">Filed</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>USDOT Number</span>
                    <Badge className="bg-green-100 text-green-800">3847291</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Federal Compliance Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Federal Compliance Requirements
          </CardTitle>
          <CardDescription>
            Federal Motor Carrier Safety Administration (FMCSA) and DOT requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">FMCSA Requirements</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 border rounded">
                    <span>DOT Safety Rating</span>
                    <Badge className="bg-green-100 text-green-800">Satisfactory</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>Drug & Alcohol Program</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>Hours of Service (ELD)</span>
                    <Badge className="bg-green-100 text-green-800">Implemented</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Environmental Compliance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 border rounded">
                    <span>EPA Emissions</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>Storm Water Permit</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>Waste Management</span>
                    <Badge className="bg-green-100 text-green-800">Certified</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Compliance Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded border-l-4 border-l-red-500">
              <div>
                <h4 className="font-medium">VDOT Quality Assurance Certification</h4>
                <p className="text-sm text-gray-600">Annual certification renewal required</p>
              </div>
              <div className="text-right">
                <Badge variant="destructive">Due: Jun 15, 2024</Badge>
                <p className="text-xs text-gray-500 mt-1">7 days overdue</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded border-l-4 border-l-orange-500">
              <div>
                <h4 className="font-medium">PPE Training Renewal</h4>
                <p className="text-sm text-gray-600">2 employees need renewal training</p>
              </div>
              <div className="text-right">
                <Badge className="bg-orange-100 text-orange-800">Due: Jul 8, 2024</Badge>
                <p className="text-xs text-gray-500 mt-1">15 days remaining</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded border-l-4 border-l-yellow-500">
              <div>
                <h4 className="font-medium">IFTA Quarterly Report</h4>
                <p className="text-sm text-gray-600">Q2 2024 fuel tax report</p>
              </div>
              <div className="text-right">
                <Badge className="bg-yellow-100 text-yellow-800">Due: Jul 31, 2024</Badge>
                <p className="text-xs text-gray-500 mt-1">38 days remaining</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirginiaCompliance;
