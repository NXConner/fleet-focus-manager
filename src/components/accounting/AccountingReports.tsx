
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, FileText, PieChart } from "lucide-react";

const AccountingReports = () => {
  const reports = [
    {
      title: "Profit & Loss",
      description: "Income statement showing revenue and expenses",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Balance Sheet",
      description: "Assets, liabilities, and equity summary",
      icon: BarChart,
      color: "text-blue-600"
    },
    {
      title: "Cash Flow",
      description: "Cash inflows and outflows analysis",
      icon: PieChart,
      color: "text-purple-600"
    },
    {
      title: "Trial Balance",
      description: "All account balances verification",
      icon: FileText,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <p className="text-muted-foreground">Financial reports and business insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, index) => {
          const IconComponent = report.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className={`h-5 w-5 ${report.color}`} />
                  {report.title}
                </CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to generate and view this report
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Advanced reporting features in development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Additional reports including aged receivables, aged payables, tax reports, and custom analytics will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountingReports;
