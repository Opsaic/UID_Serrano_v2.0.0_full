import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, User } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: "PRJ-001",
      name: "Downtown Office Complex",
      client: "Acme Corp",
      doors: 48,
      status: "In Progress",
      date: "2025-10-15",
      value: "$24,800",
    },
    {
      id: "PRJ-002",
      name: "Residential Tower",
      client: "BuildCo",
      doors: 96,
      status: "Completed",
      date: "2025-09-28",
      value: "$48,200",
    },
    {
      id: "PRJ-003",
      name: "Retail Center Renovation",
      client: "Metro Design",
      doors: 32,
      status: "Planning",
      date: "2025-10-20",
      value: "$16,800",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Projects</h1>
            <p className="mt-2 text-muted-foreground">Manage all your door installation projects</p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">New Project</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.id}</CardDescription>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {project.client}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {project.doors} doors
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(project.date).toLocaleDateString()}
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Project Value</span>
                      <span className="text-lg font-semibold text-foreground">{project.value}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
