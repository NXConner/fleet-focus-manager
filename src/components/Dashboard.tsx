
import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import QuickStats from "./dashboard/QuickStats";
import ComplianceStats from "./dashboard/ComplianceStats";
import GPSMapWidget from "./dashboard/GPSMapWidget";
import DashboardTabs from "./dashboard/DashboardTabs";

const Dashboard = () => {
  console.log("Dashboard component rendering");
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />
        
        {/* Quick Stats */}
        <QuickStats />

        {/* GPS Map and Compliance Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GPSMapWidget />
          <ComplianceStats />
        </div>

        <DashboardTabs />
      </div>
    </div>
  );
};

export default Dashboard;
