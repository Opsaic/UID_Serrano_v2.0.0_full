"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SmartRecommendationsProps {
  recommendations: Array<{
    id: string
    title: string
    description: string
    action: string
    priority: number
  }>
  onApply: (id: string) => void
}

export function SmartRecommendations({ recommendations, onApply }: SmartRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations
            .sort((a, b) => b.priority - a.priority)
            .map((rec) => (
              <div key={rec.id} className="p-4 border rounded-lg space-y-3">
                <div>
                  <div className="font-semibold">{rec.title}</div>
                  <div className="text-sm text-muted-foreground">{rec.description}</div>
                </div>
                <Button size="sm" onClick={() => onApply(rec.id)}>
                  {rec.action}
                </Button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
