import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export async function ProjectsOverview() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, status, progress, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>Your latest active projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">Progress: {project.progress || 0}%</p>
                </div>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No projects yet</p>
              <Link href="/projects/new" className="text-accent hover:underline text-sm mt-2 inline-block">
                Create your first project
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
