"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EstimateSummaryProps {
  estimate: {
    materials_cost: number
    labor_cost: number
    overhead: number
    profit_margin: number
    total: number
  }
  onSave: () => void
  onExport: () => void
}

export function EstimateSummary({ estimate, onSave, onExport }: EstimateSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estimate Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Materials Cost:</span>
            <span>${estimate.materials_cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Labor Cost:</span>
            <span>${estimate.labor_cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Overhead ({(estimate.overhead * 100).toFixed(0)}%):</span>
            <span>${((estimate.materials_cost + estimate.labor_cost) * estimate.overhead).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Profit Margin ({(estimate.profit_margin * 100).toFixed(0)}%):</span>
            <span>${(estimate.total * estimate.profit_margin).toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total Estimate:</span>
            <span>${estimate.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onSave}>Save Estimate</Button>
          <Button variant="outline" onClick={onExport}>
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
