
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const ComplianceAlerts = () => {
  return (
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
  );
};

export default ComplianceAlerts;
