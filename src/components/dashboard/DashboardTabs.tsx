
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeManagement from "../EmployeeManagement";
import VehicleManagement from "../VehicleManagement";
import EquipmentManagement from "../EquipmentManagement";
import InsuranceManagement from "../InsuranceManagement";
import { MaintenanceChecklist } from "../MaintenanceChecklist";
import AccountingDashboard from "../AccountingDashboard";
import ReceiptManagement from "../ReceiptManagement";
import TaxManagement from "../TaxManagement";
import TimeTracker from "../TimeTracker";
import GeofencedTimeTracker from "../GeofencedTimeTracker";
import EmployeeMap from "../EmployeeMap";
import PayrollManagement from "../PayrollManagement";
import VirginiaCompliance from "../VirginiaCompliance";
import LineStripping from "../LineStripping";
import { 
  Users, 
  Car, 
  Wrench, 
  Shield, 
  CheckSquare, 
  Calculator,
  Receipt,
  Clock,
  MapPin,
  Scale,
  PaintBucket,
  Navigation
} from "lucide-react";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="employees" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-12">
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
        <TabsTrigger value="geofencing" className="flex items-center gap-2">
          <Navigation className="h-4 w-4" />
          Geofenced Time
        </TabsTrigger>
        <TabsTrigger value="gps" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          GPS Tracking
        </TabsTrigger>
        <TabsTrigger value="compliance" className="flex items-center gap-2">
          <Scale className="h-4 w-4" />
          VA Compliance
        </TabsTrigger>
        <TabsTrigger value="linestripping" className="flex items-center gap-2">
          <PaintBucket className="h-4 w-4" />
          Line Stripping
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

      <TabsContent value="geofencing">
        <GeofencedTimeTracker />
      </TabsContent>

      <TabsContent value="gps">
        <EmployeeMap />
      </TabsContent>

      <TabsContent value="compliance">
        <VirginiaCompliance />
      </TabsContent>

      <TabsContent value="linestripping">
        <LineStripping />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
