import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/server"

export async function ProjectResources({ projectId }: { projectId: string }) {
  const supabase = await createClient()

  const { data: resources } = await supabase
    .from("project_resources")
    .select("*, profiles(full_name, email)")
    .eq("project_id", projectId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Resources</CardTitle>
        <CardDescription>Team members assigned to this project</CardDescription>
      </CardHeader>
      <CardContent>
        {resources && resources.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Hourly Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {resource.profiles?.full_name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{resource.profiles?.full_name || "Unknown"}</div>
                        <div className="text-sm text-muted-foreground">{resource.profiles?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{resource.role || "-"}</TableCell>
                  <TableCell>{resource.allocation_percentage || 0}%</TableCell>
                  <TableCell>${resource.hourly_rate?.toFixed(2) || "0.00"}/hr</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No team members assigned</div>
        )}
      </CardContent>
    </Card>
  )
}
