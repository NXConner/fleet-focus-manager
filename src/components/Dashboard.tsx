
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeManagement from "./EmployeeManagement";
import VehicleManagement from "./VehicleManagement";
import EquipmentManagement from "./EquipmentManagement";
import InsuranceManagement from "./InsuranceManagement";
import { MaintenanceChecklist } from "./MaintenanceChecklist";
import AccountingDashboard from "./AccountingDashboard";
import { 
  Users, 
  Car, 
  Wrench, 
  Shield, 
  CheckSquare, 
  Calculator,
  BarChart3,
  DollarSign,
  FileText
} from "lucide-react";

const Dashboard = () => {
  console.log("Dashboard component rendering");
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management Dashboard</h1>
          <p className="text-gray-600">Manage your fleet operations, employees, and finances</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">3 in maintenance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insurance Policies</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">2 expiring soon</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employees" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
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
            <AccountingDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
