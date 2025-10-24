import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

export async function ProjectTasks({ projectId }: { projectId: string }) {
  const supabase = await createClient()

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*, profiles(full_name)")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Manage project tasks and assignments</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks && tasks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox checked={task.status === "completed"} />
                  </TableCell>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.profiles?.full_name || "Unassigned"}</TableCell>
                  <TableCell>
                    <Badge variant={task.status === "completed" ? "default" : "secondary"}>{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.due_date ? format(new Date(task.due_date), "MMM d, yyyy") : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No tasks yet</div>
        )}
      </CardContent>
    </Card>
  )
}
