import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, MoreVertical } from "lucide-react"
import Link from "next/link"

export function ProjectHeader({ project }: { project: any }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
        </div>
        <p className="text-muted-foreground">{project.description || "No description"}</p>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <span className="text-muted-foreground">
            Company: <span className="font-medium text-foreground">{project.companies?.name || "None"}</span>
          </span>
          <span className="text-muted-foreground">
            Progress: <span className="font-medium text-foreground">{project.progress || 0}%</span>
          </span>
          {project.budget && (
            <span className="text-muted-foreground">
              Budget: <span className="font-medium text-foreground">${project.budget.toLocaleString()}</span>
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/projects/${project.id}/edit`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
