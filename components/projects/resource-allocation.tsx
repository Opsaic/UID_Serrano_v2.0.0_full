"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Resource {
  id: string
  profiles: {
    full_name: string
    email: string
  }
  role: string
  allocation_percentage: number
  hourly_rate: number
}

interface ResourceAllocationProps {
  resources: Resource[]
}

export function ResourceAllocation({ resources }: ResourceAllocationProps) {
  const totalAllocation = resources.reduce((sum, r) => sum + (r.allocation_percentage || 0), 0)
  const avgAllocation = resources.length > 0 ? totalAllocation / resources.length : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Resource Allocation</CardTitle>
          <Badge variant="secondary">{avgAllocation.toFixed(0)}% avg</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resources.map((resource) => {
            const initials = resource.profiles.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()

            const allocationColor =
              resource.allocation_percentage > 100
                ? "text-red-600"
                : resource.allocation_percentage > 80
                  ? "text-orange-600"
                  : "text-green-600"

            return (
              <div key={resource.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{resource.profiles.full_name}</div>
                      <div className="text-sm text-muted-foreground">{resource.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${allocationColor}`}>{resource.allocation_percentage}%</div>
                    <div className="text-xs text-muted-foreground">${resource.hourly_rate}/hr</div>
                  </div>
                </div>
                <Progress value={Math.min(resource.allocation_percentage, 100)} />
              </div>
            )
          })}

          {resources.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No resources assigned</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
