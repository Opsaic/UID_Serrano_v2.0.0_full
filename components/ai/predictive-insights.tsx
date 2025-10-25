"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PredictiveInsightsProps {
  insights: Array<{
    id: string
    type: "opportunity" | "risk" | "trend"
    title: string
    description: string
    confidence: number
    impact: "high" | "medium" | "low"
  }>
}

export function PredictiveInsights({ insights }: PredictiveInsightsProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-500/10 text-green-500"
      case "risk":
        return "bg-red-500/10 text-red-500"
      case "trend":
        return "bg-blue-500/10 text-blue-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Predictive Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(insight.type)}>{insight.type}</Badge>
                  <Badge variant={getImpactColor(insight.impact)}>{insight.impact} impact</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{insight.confidence}% confidence</span>
              </div>
              <div>
                <div className="font-semibold">{insight.title}</div>
                <div className="text-sm text-muted-foreground">{insight.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
