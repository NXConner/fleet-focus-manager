
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeManagement from "./EmployeeManagement";
import VehicleManagement from "./VehicleManagement";
import EquipmentManagement from "./EquipmentManagement";
import InsuranceManagement from "./InsuranceManagement";
import { MaintenanceChecklist } from "./MaintenanceChecklist";
import AccountingDashboard from "./AccountingDashboard";
import ReceiptManagement from "./ReceiptManagement";
import TaxManagement from "./TaxManagement";
import TimeTracker from "./TimeTracker";
import EmployeeMap from "./EmployeeMap";
import PayrollManagement from "./PayrollManagement";
import VirginiaCompliance from "./VirginiaCompliance";
import { 
  Users, 
  Car, 
  Wrench, 
  Shield, 
  CheckSquare, 
  Calculator,
  BarChart3,
  DollarSign,
  FileText,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Clock,
  MapPin,
  Briefcase,
  Scale,
  HardHat
} from "lucide-react";

const Dashboard = () => {
  console.log("Dashboard component rendering");
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conner Asphalt Tech Solutions</h1>
          <p className="text-gray-600">Fleet Management Dashboard - Virginia Licensed Asphalt Pavement Repair & Maintenance Services</p>
          <p className="text-sm text-blue-600 mt-1">Virginia Contractor License #2705123456 | VDOT Certified | Class A Pavement Specialty</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">+3 new hires this quarter (VA residents)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Fleet</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">All VA DMV inspected & registered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$127,450</div>
              <p className="text-xs text-muted-foreground">+18.2% from last month (VA projects)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Hampton Roads, Richmond, NoVA areas</p>
            </CardContent>
          </Card>
        </div>

        {/* Virginia Compliance Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety Training</CardTitle>
              <HardHat className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">OSHA Virginia compliant workforce</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VDOT Certification</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Current</div>
              <p className="text-xs text-muted-foreground">Prequalified contractor status</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">License Status</CardTitle>
              <Scale className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">Class A PAV specialty license</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inspections Due</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Virginia safety inspections</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employees" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-10">
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Equipment
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Insurance
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="accounting" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Accounting
            </TabsTrigger>
            <TabsTrigger value="receipts" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Receipts
            </TabsTrigger>
            <TabsTrigger value="timetracker" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Tracker
            </TabsTrigger>
            <TabsTrigger value="gps" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              GPS Tracking
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              VA Compliance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>

          <TabsContent value="vehicles">
            <VehicleManagement />
          </TabsContent>

          <TabsContent value="equipment">
            <EquipmentManagement />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceManagement />
          </TabsContent>

          <TabsContent value="maintenance">
            <MaintenanceChecklist vehicleId={1} />
          </TabsContent>

          <TabsContent value="accounting">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="taxes">Tax Management</TabsTrigger>
                <TabsTrigger value="payroll">Payroll</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <AccountingDashboard />
              </TabsContent>
              
              <TabsContent value="taxes">
                <TaxManagement />
              </TabsContent>
              
              <TabsContent value="payroll">
                <PayrollManagement />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="receipts">
            <ReceiptManagement />
          </TabsContent>

          <TabsContent value="timetracker">
            <TimeTracker />
          </TabsContent>

          <TabsContent value="gps">
            <EmployeeMap />
          </TabsContent>

          <TabsContent value="compliance">
            <VirginiaCompliance />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
