"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"

interface ProjectPerformanceProps {
  projects: Array<{
    id: string
    name: string
    status: string
    budget: number
    actual_cost: number
    completion: number
  }>
}

export function ProjectPerformance({ projects }: ProjectPerformanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => {
            const budgetVariance = ((project.actual_cost - project.budget) / project.budget) * 100
            const isOverBudget = budgetVariance > 0

            return (
              <div key={project.id} className="space-y-2 pb-4 border-b last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Budget: ${project.budget.toLocaleString()} | Actual: ${project.actual_cost.toLocaleString()}
                    </div>
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{project.completion}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${project.completion}%` }} />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Budget Variance</span>
                  <span className={isOverBudget ? "text-red-500" : "text-green-500"}>
                    {isOverBudget ? "+" : ""}
                    {budgetVariance.toFixed(1)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
