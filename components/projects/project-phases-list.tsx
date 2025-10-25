"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react"

interface Phase {
  id: string
  phase_name: string
  status: string
  start_date: string
  end_date: string
  completion_percentage: number
  budget_allocated: number
}

export function ProjectPhasesList({ projectId }: { projectId: string }) {
  const [phases, setPhases] = useState<Phase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPhases()
  }, [projectId])

  const fetchPhases = async () => {
    try {
      const response = await fetch(`/api/project-phases?project_id=${projectId}`)
      const data = await response.json()
      setPhases(data)
    } catch (error) {
      console.error("Error fetching phases:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "delayed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div>Loading phases...</div>
  }

  return (
    <div className="space-y-4">
      {phases.map((phase) => (
        <Card key={phase.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              {getStatusIcon(phase.status)}
              <CardTitle className="text-lg font-medium">{phase.phase_name}</CardTitle>
            </div>
            <Badge className={getStatusColor(phase.status)}>{phase.status.replace("_", " ")}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{phase.completion_percentage}%</span>
                </div>
                <Progress value={phase.completion_percentage} />
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Start: </span>
                  <span>{new Date(phase.start_date).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">End: </span>
                  <span>{new Date(phase.end_date).toLocaleDateString()}</span>
                </div>
              </div>
              {phase.budget_allocated && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Budget: </span>
                  <span className="font-medium">${phase.budget_allocated.toLocaleString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
