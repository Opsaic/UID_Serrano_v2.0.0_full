"use client"
import { BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ReportsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <p className="text-sm text-muted-foreground">View financial reports and analytics</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Financial reports coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
