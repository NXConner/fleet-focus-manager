
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AsphaltRepairProjects from "./asphalt/AsphaltRepairProjects";
import AsphaltRepairSpecifications from "./asphalt/AsphaltRepairSpecifications";
import AsphaltRepairCompliance from "./asphalt/AsphaltRepairCompliance";
import AsphaltRepairEquipment from "./asphalt/AsphaltRepairEquipment";
import { 
  Settings, 
  FileText, 
  Scale, 
  Wrench
} from "lucide-react";

const AsphaltRepairManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Asphalt Pavement Repair</h2>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="specifications" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Specifications
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Equipment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <AsphaltRepairProjects />
        </TabsContent>

        <TabsContent value="specifications">
          <AsphaltRepairSpecifications />
        </TabsContent>

        <TabsContent value="compliance">
          <AsphaltRepairCompliance />
        </TabsContent>

        <TabsContent value="equipment">
          <AsphaltRepairEquipment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AsphaltRepairManagement;
