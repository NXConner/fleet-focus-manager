
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Receipt } from "lucide-react";

const BillManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Bill Management</h2>
          <p className="text-muted-foreground">Record and pay vendor bills</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Bill
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Bill Management
          </CardTitle>
          <CardDescription>
            Full bill management system coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This feature will include bill entry, approval workflows, and payment scheduling.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillManagement;
