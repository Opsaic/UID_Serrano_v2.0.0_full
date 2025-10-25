"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

interface Task {
  id: string
  name: string
  start_date: string
  due_date: string
  status: string
  progress?: number
}

interface GanttChartProps {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export function GanttChart({ tasks, onTaskClick }: GanttChartProps) {
  const [viewStart, setViewStart] = React.useState(() => startOfMonth(new Date()))
  const [viewEnd, setViewEnd] = React.useState(() => endOfMonth(new Date()))

  const days = eachDayOfInterval({ start: viewStart, end: viewEnd })
  const totalDays = days.length

  const getTaskPosition = (task: Task) => {
    const taskStart = new Date(task.start_date)
    const taskEnd = new Date(task.due_date)

    const startOffset = differenceInDays(taskStart, viewStart)
    const duration = differenceInDays(taskEnd, taskStart) + 1

    const left = (startOffset / totalDays) * 100
    const width = (duration / totalDays) * 100

    return { left: `${Math.max(0, left)}%`, width: `${Math.min(100 - left, width)}%` }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
        return "bg-blue-500"
      case "blocked":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Timeline header */}
          <div className="flex border-b mb-4 pb-2">
            <div className="w-48 flex-shrink-0 font-medium text-sm">Task</div>
            <div className="flex-1 flex">
              {days.map((day, index) => (
                <div key={index} className="flex-1 text-center text-xs text-muted-foreground">
                  {format(day, "d")}
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {tasks.map((task) => {
              const position = getTaskPosition(task)
              return (
                <div key={task.id} className="flex items-center">
                  <div className="w-48 flex-shrink-0 text-sm truncate pr-4">{task.name}</div>
                  <div className="flex-1 relative h-8">
                    <div
                      className={`absolute h-6 rounded cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(task.status)}`}
                      style={position}
                      onClick={() => onTaskClick?.(task)}
                    >
                      {task.progress !== undefined && (
                        <div className="h-full bg-white/30 rounded-l" style={{ width: `${task.progress}%` }} />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {tasks.length === 0 && <div className="text-center py-12 text-muted-foreground">No tasks to display</div>}
        </div>
      </CardContent>
    </Card>
  )
}
