
import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus } from "lucide-react";

const SampleCustomerData = () => {
  const { toast } = useToast();

  const sampleCustomers = [
    {
      customer_name: "Walmart Supercenter",
      company_name: "Walmart Inc.",
      email: "facilities@walmart.com",
      phone: "(555) 123-4567",
      billing_address: "702 SW 8th St, Bentonville, AR 72716",
      shipping_address: "Multiple store locations",
      tax_id: "71-0415188",
      payment_terms: 45,
      credit_limit: 50000
    },
    {
      customer_name: "Home Depot Store #4523",
      company_name: "The Home Depot Inc.",
      email: "maintenance@homedepot.com",
      phone: "(555) 234-5678",
      billing_address: "2455 Paces Ferry Rd NW, Atlanta, GA 30339",
      shipping_address: "8901 Highway 6, Houston, TX 77095",
      tax_id: "58-1851917",
      payment_terms: 30,
      credit_limit: 35000
    },
    {
      customer_name: "City of Sugar Land",
      company_name: "City of Sugar Land Public Works",
      email: "publicworks@sugarlandtx.gov",
      phone: "(281) 275-2700",
      billing_address: "2700 Town Center Blvd N, Sugar Land, TX 77479",
      shipping_address: "Various city locations",
      tax_id: "74-6000123",
      payment_terms: 60,
      credit_limit: 100000
    },
    {
      customer_name: "Memorial Hermann Hospital",
      company_name: "Memorial Hermann Health System",
      email: "facilities@memorialhermann.org",
      phone: "(713) 448-6796",
      billing_address: "909 Frostwood Dr, Houston, TX 77024",
      shipping_address: "6411 Fannin St, Houston, TX 77030",
      tax_id: "74-1109103",
      payment_terms: 45,
      credit_limit: 25000
    },
    {
      customer_name: "Katy ISD",
      company_name: "Katy Independent School District",
      email: "maintenance@katyisd.org",
      phone: "(281) 396-6000",
      billing_address: "6301 S Stadium Ln, Katy, TX 77494",
      shipping_address: "Multiple school locations",
      tax_id: "74-6000456",
      payment_terms: 30,
      credit_limit: 75000
    },
    {
      customer_name: "Westfield Town Center",
      company_name: "Unibail-Rodamco-Westfield",
      email: "operations@westfield.com",
      phone: "(555) 345-6789",
      billing_address: "2800 W Sam Houston Pkwy S, Houston, TX 77042",
      shipping_address: "2800 W Sam Houston Pkwy S, Houston, TX 77042",
      tax_id: "95-1234567",
      payment_terms: 30,
      credit_limit: 40000
    },
    {
      customer_name: "Johnson & Johnson Distribution",
      company_name: "Johnson & Johnson",
      email: "facilities@jnj.com",
      phone: "(555) 456-7890",
      billing_address: "One Johnson & Johnson Plaza, New Brunswick, NJ 08933",
      shipping_address: "7500 Centurion Pkwy, Houston, TX 77040",
      tax_id: "22-1024240",
      payment_terms: 45,
      credit_limit: 60000
    },
    {
      customer_name: "Pearland Town Center",
      company_name: "Simon Property Group",
      email: "management@simon.com",
      phone: "(555) 567-8901",
      billing_address: "225 W Washington St, Indianapolis, IN 46204",
      shipping_address: "11200 Broadway St, Pearland, TX 77584",
      tax_id: "35-1368571",
      payment_terms: 30,
      credit_limit: 45000
    }
  ];

  const insertSampleCustomers = async () => {
    try {
      const { error } = await supabase
        .from('customers')
        .insert(sampleCustomers);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sample customer data has been added successfully",
      });
    } catch (error) {
      console.error('Error inserting sample customers:', error);
      toast({
        title: "Error",
        description: "Failed to add sample customer data",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Sample Customer Data
        </CardTitle>
        <CardDescription>
          Add realistic customer data for Conner Asphalt Tech Solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This will add sample customers including retail chains, municipalities, 
          hospitals, schools, and commercial properties that typically need asphalt services.
        </p>
        <Button onClick={insertSampleCustomers} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Sample Customer Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default SampleCustomerData;
