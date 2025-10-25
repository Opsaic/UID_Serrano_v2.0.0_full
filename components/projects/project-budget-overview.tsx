"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Budget {
  id: string
  category: string
  total_amount: number
  spent_amount: number
  remaining_amount: number
}

export function ProjectBudgetOverview({ projectId }: { projectId: string }) {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBudgets()
  }, [projectId])

  const fetchBudgets = async () => {
    try {
      const response = await fetch(`/api/budgets?project_id=${projectId}`)
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      console.error("Error fetching budgets:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.total_amount, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent_amount, 0)
  const totalRemaining = totalBudget - totalSpent
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  if (loading) {
    return <div>Loading budget...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRemaining)}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Budget Utilization</span>
              <span className="font-medium">{spentPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={spentPercentage} className={spentPercentage > 90 ? "bg-red-100" : ""} />
            {spentPercentage > 90 && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>Budget overrun warning</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Budget by Category</h3>
        {budgets.map((budget) => {
          const percentage = (budget.spent_amount / budget.total_amount) * 100
          const isOverBudget = budget.spent_amount > budget.total_amount

          return (
            <Card key={budget.id}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{budget.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(budget.spent_amount)} / {formatCurrency(budget.total_amount)}
                    </span>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className={isOverBudget ? "bg-red-100" : ""} />
                  <div className="flex justify-between text-sm">
                    <span className={isOverBudget ? "text-red-600" : "text-muted-foreground"}>
                      {percentage.toFixed(1)}% used
                    </span>
                    <span className="text-muted-foreground">{formatCurrency(budget.remaining_amount)} remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
