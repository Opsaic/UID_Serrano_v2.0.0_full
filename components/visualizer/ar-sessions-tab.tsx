"use client"

import { useState, useEffect } from "react"
import { Smartphone, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ARSession {
  id: string
  session_type: string
  duration?: number
  timestamp: string
  data: any
}

export function ARSessionsTab() {
  const [sessions, setSessions] = useState<ARSession[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/ar-sessions")
      const data = await response.json()
      setSessions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load AR sessions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AR Sessions</h2>
        <p className="text-sm text-muted-foreground">View augmented reality session history</p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading AR sessions...</div>
      ) : sessions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Smartphone className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No AR sessions yet. Start visualizing doors in AR to see history.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  AR Session
                </CardTitle>
                <CardDescription>{session.session_type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(session.timestamp).toLocaleDateString()}
                </div>
                {session.duration && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {Math.floor(session.duration / 60)} minutes
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
