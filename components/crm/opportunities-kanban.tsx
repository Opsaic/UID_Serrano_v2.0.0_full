"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { DollarSign, Calendar } from "lucide-react"

interface Opportunity {
  id: string
  name: string
  value: number
  stage: string
  probability: number
  expected_close_date: string
  companies?: { name: string }
}

interface OpportunitiesKanbanProps {
  opportunities: Opportunity[]
  onOpportunityClick?: (opportunity: Opportunity) => void
}

const stages = [
  { id: "prospecting", label: "Prospecting", color: "bg-gray-100 dark:bg-gray-800" },
  { id: "qualification", label: "Qualification", color: "bg-blue-100 dark:bg-blue-900/30" },
  { id: "proposal", label: "Proposal", color: "bg-purple-100 dark:bg-purple-900/30" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-100 dark:bg-orange-900/30" },
  { id: "closed_won", label: "Closed Won", color: "bg-green-100 dark:bg-green-900/30" },
  { id: "closed_lost", label: "Closed Lost", color: "bg-red-100 dark:bg-red-900/30" },
]

export function OpportunitiesKanban({ opportunities, onOpportunityClick }: OpportunitiesKanbanProps) {
  const opportunitiesByStage = React.useMemo(() => {
    const grouped: Record<string, Opportunity[]> = {}
    stages.forEach((stage) => {
      grouped[stage.id] = opportunities.filter((opp) => opp.stage === stage.id)
    })
    return grouped
  }, [opportunities])

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageOpps = opportunitiesByStage[stage.id] || []
        const stageValue = stageOpps.reduce((sum, opp) => sum + (opp.value || 0), 0)

        return (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className={`rounded-lg p-3 mb-3 ${stage.color}`}>
              <h3 className="font-semibold text-sm">{stage.label}</h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span>{stageOpps.length} deals</span>
                <span>•</span>
                <span>${stageValue.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              {stageOpps.map((opp) => (
                <Card
                  key={opp.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onOpportunityClick?.(opp)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">{opp.name}</CardTitle>
                    {opp.companies && <p className="text-xs text-muted-foreground mt-1">{opp.companies.name}</p>}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-medium text-foreground">${opp.value.toLocaleString()}</span>
                      </div>
                      <Badge variant="secondary">{opp.probability}%</Badge>
                    </div>
                    {opp.expected_close_date && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(opp.expected_close_date), "MMM d, yyyy")}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {stageOpps.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">No opportunities</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
