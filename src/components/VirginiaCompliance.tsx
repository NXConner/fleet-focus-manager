
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  FileText,
  HardHat,
  Car,
  Scale,
  Building,
  Clock,
  Download,
  ExternalLink
} from "lucide-react";

const VirginiaCompliance = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // OSHA Virginia Requirements
  const oshaRequirements = [
    {
      id: 1,
      requirement: "OSHA 10-Hour Construction Safety Training",
      status: "Current",
      expiryDate: "2025-03-15",
      employees: "16/16 certified",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      requirement: "Hazard Communication Standard (HazCom)",
      status: "Current",
      expiryDate: "2025-01-20",
      employees: "16/16 trained",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      requirement: "Personal Protective Equipment (PPE) Training",
      status: "Due Soon",
      expiryDate: "2024-06-10",
      employees: "14/16 current",
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 4,
      requirement: "Fall Protection Training",
      status: "Current",
      expiryDate: "2025-02-28",
      employees: "12/16 certified",
      color: "bg-green-100 text-green-800"
    }
  ];

  // VDOT Requirements
  const vdotRequirements = [
    {
      id: 1,
      requirement: "VDOT Prequalification Status",
      status: "Active",
      expiryDate: "2024-12-31",
      certNumber: "PQ-2024-ABC123",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      requirement: "Work Zone Traffic Control Certification",
      status: "Current",
      expiryDate: "2025-04-15",
      certNumber: "WZ-2024-DEF456",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      requirement: "Quality Assurance Certification",
      status: "Renewal Required",
      expiryDate: "2024-07-30",
      certNumber: "QA-2023-GHI789",
      color: "bg-red-100 text-red-800"
    }
  ];

  // Virginia Board of Contractors
  const contractorRequirements = [
    {
      id: 1,
      requirement: "Class A Contractor License",
      status: "Active",
      licenseNumber: "2705123456",
      expiryDate: "2025-08-31",
      specialty: "Highway/Heavy Construction",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      requirement: "PAV Specialty License",
      status: "Active",
      licenseNumber: "PAV-2024-789",
      expiryDate: "2025-06-30",
      specialty: "Pavement Specialty",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      requirement: "Continuing Education Requirements",
      status: "In Progress",
      hours: "6/8 hours completed",
      expiryDate: "2024-08-31",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  // DMV Requirements
  const dmvRequirements = [
    {
      id: 1,
      vehicle: "2019 Ford F-550 (Fleet #001)",
      inspection: "Current",
      expiryDate: "2024-09-15",
      registration: "Current",
      regExpiry: "2024-12-31",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      vehicle: "2020 Freightliner (Fleet #002)",
      inspection: "Due Soon",
      expiryDate: "2024-06-20",
      registration: "Current",
      regExpiry: "2025-01-15",
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 3,
      vehicle: "2018 Equipment Trailer (Fleet #003)",
      inspection: "Current",
      expiryDate: "2024-11-30",
      registration: "Current",
      regExpiry: "2024-10-31",
      color: "bg-green-100 text-green-800"
    }
  ];

  const complianceScore = 87;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Virginia Compliance Dashboard</h2>
          <p className="text-slate-600">OSHA, VDOT, Board of Contractors & DMV Requirements</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{complianceScore}%</div>
            <div className="text-sm text-gray-600">Compliance Score</div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Compliance Overview Cards */}
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

      {/* Alerts Section */}
      <div className="space-y-4">
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Action Required:</strong> PPE Training for 2 employees expires in 15 days. Schedule renewal training.
          </AlertDescription>
        </Alert>
        
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Urgent:</strong> VDOT Quality Assurance Certification expired. Contact VDOT for renewal process.
          </AlertDescription>
        </Alert>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="osha">OSHA Virginia</TabsTrigger>
          <TabsTrigger value="vdot">VDOT</TabsTrigger>
          <TabsTrigger value="licenses">Licenses & DMV</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Renewals</CardTitle>
                <CardDescription>Items requiring attention in the next 90 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium">PPE Training Renewal</p>
                    <p className="text-sm text-gray-600">Expires: June 10, 2024</p>
                  </div>
                  <Badge variant="outline">15 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">VDOT QA Certification</p>
                    <p className="text-sm text-gray-600">Expired: July 30, 2024</p>
                  </div>
                  <Badge variant="outline">Overdue</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Fleet #002 Inspection</p>
                    <p className="text-sm text-gray-600">Due: June 20, 2024</p>
                  </div>
                  <Badge variant="outline">25 days</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Virginia Industry Standards</CardTitle>
                <CardDescription>Current compliance with state requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Safety Training Compliance</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">License & Certification Status</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vehicle Compliance</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="osha">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="w-5 h-5" />
                OSHA Virginia Safety Requirements
              </CardTitle>
              <CardDescription>
                Occupational Safety and Health Administration requirements for Virginia construction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {oshaRequirements.map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{req.requirement}</h4>
                      <p className="text-sm text-gray-600">Expires: {req.expiryDate}</p>
                      <p className="text-sm text-gray-600">{req.employees}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={req.color}>{req.status}</Badge>
                      <Button variant="outline" size="sm">
                        <FileText className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vdot">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                VDOT Certifications & Requirements
              </CardTitle>
              <CardDescription>
                Virginia Department of Transportation prequalification and project requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vdotRequirements.map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{req.requirement}</h4>
                      <p className="text-sm text-gray-600">Certificate: {req.certNumber}</p>
                      <p className="text-sm text-gray-600">Expires: {req.expiryDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={req.color}>{req.status}</Badge>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        VDOT Portal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Virginia Board of Contractors
                </CardTitle>
                <CardDescription>
                  Professional licensing and specialty certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractorRequirements.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{req.requirement}</h4>
                        <p className="text-sm text-gray-600">
                          {req.licenseNumber ? `License: ${req.licenseNumber}` : req.hours}
                        </p>
                        <p className="text-sm text-gray-600">
                          {req.specialty ? `Specialty: ${req.specialty}` : `Due: ${req.expiryDate}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={req.color}>{req.status}</Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Virginia DMV Fleet Compliance
                </CardTitle>
                <CardDescription>
                  Vehicle inspections, registrations, and commercial permits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dmvRequirements.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{req.vehicle}</h4>
                        <p className="text-sm text-gray-600">
                          Inspection: {req.inspection} (Expires: {req.expiryDate})
                        </p>
                        <p className="text-sm text-gray-600">
                          Registration: {req.registration} (Expires: {req.regExpiry})
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={req.color}>{req.inspection}</Badge>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirginiaCompliance;
