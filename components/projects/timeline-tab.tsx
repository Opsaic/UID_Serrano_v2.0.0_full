"use client"
import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TimelineTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Timeline</h2>
        <p className="text-sm text-muted-foreground">Project timeline and schedule view</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Timeline view coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
