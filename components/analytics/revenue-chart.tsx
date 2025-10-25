"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number; expenses: number }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.revenue, d.expenses)))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.month}</span>
                <span className="font-semibold">${item.revenue.toLocaleString()}</span>
              </div>
              <div className="space-y-1">
                <div className="h-6 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${(item.revenue / maxValue) * 100}%` }} />
                </div>
                <div className="h-6 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${(item.expenses / maxValue) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span>Expenses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
