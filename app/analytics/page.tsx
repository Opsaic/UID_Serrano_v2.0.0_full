"use client"

import { useEffect, useState } from "react"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { ProjectPerformance } from "@/components/analytics/project-performance"
import { SalesPipeline } from "@/components/analytics/sales-pipeline"
import { ReportGenerator } from "@/components/analytics/report-generator"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsPage() {
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [projectData, setProjectData] = useState<any[]>([])
  const [pipelineData, setPipelineData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [revenueRes, projectsRes, pipelineRes] = await Promise.all([
          fetch("/api/analytics/revenue?months=6"),
          fetch("/api/analytics/projects"),
          fetch("/api/analytics/pipeline"),
        ])

        const revenue = await revenueRes.json()
        const projects = await projectsRes.json()
        const pipeline = await pipelineRes.json()

        setRevenueData(revenue)
        setProjectData(projects)
        setPipelineData(pipeline)
      } catch (error) {
        console.error("[v0] Error fetching analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleGenerateReport = async (config: any) => {
    console.log("[v0] Generating report with config:", config)
    try {
      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `report-${Date.now()}.pdf`
        a.click()
      }
    } catch (error) {
      console.error("[v0] Error generating report:", error)
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Business intelligence and performance metrics</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    )
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
