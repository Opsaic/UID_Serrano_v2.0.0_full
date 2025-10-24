import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { ProjectsStats } from "@/components/projects/projects-stats"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your custom door projects and timelines</p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <ProjectsStats />
      </Suspense>

      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsGrid />
      </Suspense>
    </div>
  )
}
