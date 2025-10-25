"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Resource {
  id: string
  user_id: string
  role: string
  allocation_percentage: number
  hourly_rate: number
  profiles: {
    first_name: string
    last_name: string
    email: string
  }
}

export function ProjectResourcesTable({ projectId }: { projectId: string }) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResources()
  }, [projectId])

  const fetchResources = async () => {
    try {
      const response = await fetch(`/api/project-resources?project_id=${projectId}`)
      const data = await response.json()
      setResources(data)
    } catch (error) {
      console.error("Error fetching resources:", error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  if (loading) {
    return <div>Loading resources...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(resource.profiles.first_name, resource.profiles.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {resource.profiles.first_name} {resource.profiles.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{resource.profiles.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{resource.role}</Badge>
                <div className="text-right">
                  <p className="text-sm font-medium">{resource.allocation_percentage}% allocated</p>
                  <p className="text-sm text-muted-foreground">${resource.hourly_rate}/hr</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
