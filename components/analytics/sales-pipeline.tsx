"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SalesPipelineProps {
  stages: Array<{
    name: string
    count: number
    value: number
  }>
}

export function SalesPipeline({ stages }: SalesPipelineProps) {
  const totalValue = stages.reduce((sum, stage) => sum + stage.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const percentage = (stage.value / totalValue) * 100

            return (
              <div key={stage.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{stage.name}</div>
                      <div className="text-sm text-muted-foreground">{stage.count} opportunities</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${stage.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total Pipeline Value</span>
            <span>${totalValue.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
