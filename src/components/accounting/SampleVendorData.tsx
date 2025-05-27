
import React, { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Plus } from "lucide-react";

const SampleVendorData = () => {
  const { toast } = useToast();

  const sampleVendors = [
    {
      vendor_name: "Asphalt Materials Inc.",
      company_name: "Asphalt Materials Inc.",
      email: "orders@asphaltmaterials.com",
      phone: "(555) 234-5678",
      address: "1234 Industrial Blvd, Houston, TX 77002",
      tax_id: "75-1234567",
      payment_terms: 30
    },
    {
      vendor_name: "Sealcoat Supply Co.",
      company_name: "Sealcoat Supply Co.",
      email: "sales@sealcoatsupply.com",
      phone: "(555) 345-6789",
      address: "5678 Commerce Dr, Dallas, TX 75201",
      tax_id: "75-2345678",
      payment_terms: 15
    },
    {
      vendor_name: "Fleet Maintenance Pro",
      company_name: "Fleet Maintenance Pro",
      email: "service@fleetmaintpro.com",
      phone: "(555) 456-7890",
      address: "9012 Service Rd, Austin, TX 78701",
      tax_id: "75-3456789",
      payment_terms: 30
    },
    {
      vendor_name: "Road Marking Equipment LLC",
      company_name: "Road Marking Equipment LLC",
      email: "info@roadmarkingequip.com",
      phone: "(555) 567-8901",
      address: "3456 Equipment Way, San Antonio, TX 78201",
      tax_id: "75-4567890",
      payment_terms: 45
    },
    {
      vendor_name: "Industrial Fuel Depot",
      company_name: "Industrial Fuel Depot",
      email: "accounts@industrialfuel.com",
      phone: "(555) 678-9012",
      address: "7890 Fuel Station Rd, Fort Worth, TX 76101",
      tax_id: "75-5678901",
      payment_terms: 7
    },
    {
      vendor_name: "Safety Gear Plus",
      company_name: "Safety Gear Plus",
      email: "orders@safetygearplus.com",
      phone: "(555) 789-0123",
      address: "2345 Safety Blvd, Plano, TX 75024",
      tax_id: "75-6789012",
      payment_terms: 30
    }
  ];

  const insertSampleVendors = async () => {
    try {
      const { error } = await supabase
        .from('vendors')
        .insert(sampleVendors);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sample vendor data has been added successfully",
      });
    } catch (error) {
      console.error('Error inserting sample vendors:', error);
      toast({
        title: "Error",
        description: "Failed to add sample vendor data",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Sample Data Setup
        </CardTitle>
        <CardDescription>
          Add realistic vendor data for Conner Asphalt Tech Solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This will add sample vendors commonly used by asphalt paving companies including 
          material suppliers, equipment dealers, and service providers.
        </p>
        <Button onClick={insertSampleVendors} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Sample Vendor Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default SampleVendorData;
