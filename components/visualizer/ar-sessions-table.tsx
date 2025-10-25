import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Eye } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export async function ARSessionsTable() {
  try {
    const supabase = await createClient()

    const { data: sessions, error: sessionsError } = await supabase
      .from("ar_sessions")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(50)

    if (sessionsError) {
      console.error("[v0] Error fetching AR sessions:", sessionsError)
      throw sessionsError
    }

    if (!sessions || sessions.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>AR Sessions</CardTitle>
            <CardDescription>View and manage augmented reality sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No AR sessions yet</p>
              <Button asChild>
                <Link href="/visualizer/ar/new">Start your first AR session</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    const modelIds = [...new Set(sessions.map((s) => s.model_id).filter(Boolean))]
    const projectIds = [...new Set(sessions.map((s) => s.project_id).filter(Boolean))]

    const { data: models } = await supabase.from("models").select("id, name").in("id", modelIds)

    const { data: projects } = await supabase.from("projects").select("id, name").in("id", projectIds)

    const modelsMap = new Map(models?.map((m) => [m.id, m]) || [])
    const projectsMap = new Map(projects?.map((p) => [p.id, p]) || [])

    const sessionsWithRelations = sessions.map((session) => ({
      ...session,
      model_name: session.model_id ? modelsMap.get(session.model_id)?.name : null,
      project_name: session.project_id ? projectsMap.get(session.project_id)?.name : null,
    }))

    return (
      <Card>
        <CardHeader>
          <CardTitle>AR Sessions</CardTitle>
          <CardDescription>View and manage augmented reality sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session Type</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionsWithRelations.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <Badge>{session.session_type || "Standard"}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{session.model_name || "-"}</TableCell>
                  <TableCell>{session.project_name || "-"}</TableCell>
                  <TableCell>{session.duration ? `${Math.floor(session.duration / 60)}m` : "-"}</TableCell>
                  <TableCell>
                    {session.timestamp ? formatDistanceToNow(new Date(session.timestamp), { addSuffix: true }) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm" asChild>
                      <Link href={`/visualizer/ar/${session.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("[v0] ARSessionsTable error:", error)
    return (
      <Card>
        <CardHeader>
          <CardTitle>AR Sessions</CardTitle>
          <CardDescription>View and manage augmented reality sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Error loading AR sessions</p>
            <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
          </div>
        </CardContent>
      </Card>
    )
  }
}
