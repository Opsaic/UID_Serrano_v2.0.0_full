"use client"

import { RevenueChart } from "@/components/analytics/revenue-chart"
import { ProjectPerformance } from "@/components/analytics/project-performance"
import { SalesPipeline } from "@/components/analytics/sales-pipeline"
import { ReportGenerator } from "@/components/analytics/report-generator"

export default function AnalyticsPage() {
  // Mock data - in production, fetch from API
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 33000 },
    { month: "Apr", revenue: 61000, expenses: 38000 },
    { month: "May", revenue: 55000, expenses: 36000 },
    { month: "Jun", revenue: 67000, expenses: 40000 },
  ]

  const projectData = [
    {
      id: "1",
      name: "Office Building Doors",
      status: "in_progress",
      budget: 50000,
      actual_cost: 45000,
      completion: 75,
    },
    {
      id: "2",
      name: "Retail Store Entrance",
      status: "in_progress",
      budget: 30000,
      actual_cost: 32000,
      completion: 90,
    },
    { id: "3", name: "Hospital Wing Doors", status: "planning", budget: 80000, actual_cost: 15000, completion: 20 },
  ]

  const pipelineData = [
    { name: "Prospecting", count: 12, value: 240000 },
    { name: "Qualification", count: 8, value: 180000 },
    { name: "Proposal", count: 5, value: 120000 },
    { name: "Negotiation", count: 3, value: 90000 },
    { name: "Closed Won", count: 2, value: 60000 },
  ]

  const handleGenerateReport = (config: any) => {
    console.log("[v0] Generating report with config:", config)
    // In production, call API to generate report
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <p className="text-muted-foreground">Business intelligence and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <SalesPipeline stages={pipelineData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectPerformance projects={projectData} />
        </div>
        <ReportGenerator onGenerate={handleGenerateReport} />
      </div>
    </div>
  )
}
