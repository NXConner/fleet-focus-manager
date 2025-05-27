
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import VehicleManagement from "@/components/VehicleManagement";
import EquipmentManagement from "@/components/EquipmentManagement";
import EmployeeManagement from "@/components/EmployeeManagement";
import InsuranceManagement from "@/components/InsuranceManagement";
import Dashboard from "@/components/Dashboard";
import { Truck, Users, Calendar, FileText, Shield, Sparkles } from "lucide-react";

const Index = () => {
  console.log("Index component rendering");
  const [activeTab, setActiveTab] = useState("dashboard");

  console.log("Active tab:", activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 transition-all duration-500">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
                Fleet & Equipment Management System
              </h1>
              <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
                Comprehensive management for vehicles, equipment, and personnel
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="animate-pulse">
                <Sparkles className="w-3 h-3 mr-1" />
                Enhanced UI
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border shadow-lg">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900"
            >
              <FileText className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="vehicles" 
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900"
            >
              <Truck className="w-4 h-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger 
              value="equipment" 
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900"
            >
              <Calendar className="w-4 h-4" />
              Equipment
            </TabsTrigger>
            <TabsTrigger 
              value="employees" 
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900"
            >
              <Users className="w-4 h-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger 
              value="insurance" 
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900"
            >
              <Shield className="w-4 h-4" />
              Insurance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-fade-in">
            <Dashboard />
          </TabsContent>

          <TabsContent value="vehicles" className="animate-fade-in">
            <VehicleManagement />
          </TabsContent>

          <TabsContent value="equipment" className="animate-fade-in">
            <EquipmentManagement />
          </TabsContent>

          <TabsContent value="employees" className="animate-fade-in">
            <EmployeeManagement />
          </TabsContent>

          <TabsContent value="insurance" className="animate-fade-in">
            <InsuranceManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
