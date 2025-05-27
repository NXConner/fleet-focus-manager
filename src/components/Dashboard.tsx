
import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import QuickStats from "./dashboard/QuickStats";
import ComplianceStats from "./dashboard/ComplianceStats";
import DashboardTabs from "./dashboard/DashboardTabs";

const Dashboard = () => {
  console.log("Dashboard component rendering");
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />
        
        {/* Quick Stats */}
        <QuickStats />

        {/* Virginia Compliance Stats Row */}
        <ComplianceStats />

        <DashboardTabs />
      </div>
    </div>
  );
};

export default Dashboard;
