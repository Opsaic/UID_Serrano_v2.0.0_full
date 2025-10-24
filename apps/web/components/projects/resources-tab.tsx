"use client"
import { Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ResourcesTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Resources</h2>
        <p className="text-sm text-muted-foreground">Team members and resource allocation</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Resources view coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
