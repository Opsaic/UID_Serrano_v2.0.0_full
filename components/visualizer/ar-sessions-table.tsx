import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Eye } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export async function ARSessionsTable() {
  const supabase = await createClient()

  const { data: sessions } = await supabase
    .from("ar_sessions")
    .select("*, models(name), projects(name)")
    .order("timestamp", { ascending: false })
    .limit(50)

  return (
    <Card>
      <CardHeader>
        <CardTitle>AR Sessions</CardTitle>
        <CardDescription>View and manage augmented reality sessions</CardDescription>
      </CardHeader>
      <CardContent>
        {sessions && sessions.length > 0 ? (
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
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <Badge>{session.session_type || "Standard"}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{session.models?.name || "-"}</TableCell>
                  <TableCell>{session.projects?.name || "-"}</TableCell>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No AR sessions yet</p>
            <Button asChild>
              <Link href="/visualizer/ar/new">Start your first AR session</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
