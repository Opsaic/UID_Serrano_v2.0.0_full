"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"

interface Task {
  id: string
  name: string
  description?: string
  status: string
  priority: string
  due_date?: string
  estimated_hours?: number
  profiles?: {
    full_name: string
  }
}

interface TaskBoardProps {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

const columns = [
  { id: "todo", label: "To Do", color: "bg-gray-100 dark:bg-gray-800" },
  { id: "in_progress", label: "In Progress", color: "bg-blue-100 dark:bg-blue-900/30" },
  { id: "in_review", label: "In Review", color: "bg-purple-100 dark:bg-purple-900/30" },
  { id: "completed", label: "Completed", color: "bg-green-100 dark:bg-green-900/30" },
]

const priorityColors = {
  low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

export function TaskBoard({ tasks, onTaskClick }: TaskBoardProps) {
  const tasksByStatus = React.useMemo(() => {
    const grouped: Record<string, Task[]> = {}
    columns.forEach((col) => {
      grouped[col.id] = tasks.filter((task) => task.status === col.id)
    })
    return grouped
  }, [tasks])

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTasks = tasksByStatus[column.id] || []

        return (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className={`rounded-lg p-3 mb-3 ${column.color}`}>
              <h3 className="font-semibold text-sm">{column.label}</h3>
              <div className="text-xs text-muted-foreground mt-1">{columnTasks.length} tasks</div>
            </div>

            <div className="space-y-3">
              {columnTasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onTaskClick?.(task)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm">{task.name}</h4>
                      <Badge
                        variant="secondary"
                        className={priorityColors[task.priority as keyof typeof priorityColors]}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    {task.description && <p className="text-xs text-muted-foreground mt-2">{task.description}</p>}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {task.profiles && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {task.profiles.full_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{task.profiles.full_name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {task.due_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(task.due_date), "MMM d")}</span>
                        </div>
                      )}
                      {task.estimated_hours && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimated_hours}h</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {columnTasks.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">No tasks</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
