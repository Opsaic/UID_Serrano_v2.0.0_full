"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ReportGeneratorProps {
  onGenerate: (config: any) => void
}

export function ReportGenerator({ onGenerate }: ReportGeneratorProps) {
  const [config, setConfig] = useState({
    report_type: "financial",
    date_range: "last_month",
    start_date: "",
    end_date: "",
    format: "pdf",
    include_charts: true,
  })

  const handleGenerate = () => {
    onGenerate(config)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Report Type</Label>
          <Select value={config.report_type} onValueChange={(value) => setConfig({ ...config, report_type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Financial Summary</SelectItem>
              <SelectItem value="project">Project Status</SelectItem>
              <SelectItem value="sales">Sales Performance</SelectItem>
              <SelectItem value="crm">CRM Activity</SelectItem>
              <SelectItem value="custom">Custom Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date Range</Label>
          <Select value={config.date_range} onValueChange={(value) => setConfig({ ...config, date_range: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_week">Last Week</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {config.date_range === "custom" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={config.start_date}
                onChange={(e) => setConfig({ ...config, start_date: e.target.value })}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={config.end_date}
                onChange={(e) => setConfig({ ...config, end_date: e.target.value })}
              />
            </div>
          </div>
        )}

        <div>
          <Label>Export Format</Label>
          <Select value={config.format} onValueChange={(value) => setConfig({ ...config, format: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleGenerate} className="w-full">
          Generate Report
        </Button>
      </CardContent>
    </Card>
  )
}
