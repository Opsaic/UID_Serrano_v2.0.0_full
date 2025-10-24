import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Calendar, DollarSign } from "lucide-react"
import { format } from "date-fns"

export async function ProjectsGrid() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from("projects")
    .select("*, companies(name)")
    .order("created_at", { ascending: false })

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-accent/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.companies?.name || "No company"}</CardDescription>
                  </div>
                  <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress || 0}%</span>
                  </div>
                  <Progress value={project.progress || 0} />
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.start_date ? format(new Date(project.start_date), "MMM d") : "No date"}</span>
                  </div>
                  {project.budget && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${project.budget.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground mb-4">No projects yet</p>
          <Link
            href="/projects/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create your first project
          </Link>
        </div>
      )}
    </div>
  )
}
