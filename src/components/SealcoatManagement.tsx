
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SealcoatProjectManagement from "./sealcoat/SealcoatProjectManagement";
import SealcoatSpecifications from "./sealcoat/SealcoatSpecifications";
import SealcoatCompliance from "./sealcoat/SealcoatCompliance";
import SealcoatEquipment from "./sealcoat/SealcoatEquipment";
import { 
  Shield, 
  FileText, 
  Scale, 
  Wrench
} from "lucide-react";

const SealcoatManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Sealcoat Management</h2>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="specifications" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
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
          <SealcoatProjectManagement />
        </TabsContent>

        <TabsContent value="specifications">
          <SealcoatSpecifications />
        </TabsContent>

        <TabsContent value="compliance">
          <SealcoatCompliance />
        </TabsContent>

        <TabsContent value="equipment">
          <SealcoatEquipment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SealcoatManagement;
