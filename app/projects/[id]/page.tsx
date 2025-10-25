import { Suspense } from "react"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectTasks } from "@/components/projects/project-tasks"
import { ProjectTimeline } from "@/components/projects/project-timeline"
import { ProjectDocuments } from "@/components/projects/project-documents"
import { ProjectPhasesList } from "@/components/projects/project-phases-list"
import { ProjectBudgetOverview } from "@/components/projects/project-budget-overview"
import { ProjectResourcesTable } from "@/components/projects/project-resources-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from("projects").select("*, companies(name)").eq("id", id).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <ProjectHeader project={project} />

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="phases">Phases</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <Suspense fallback={<div>Loading tasks...</div>}>
            <ProjectTasks projectId={id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="phases" className="mt-6">
          <ProjectPhasesList projectId={id} />
        </TabsContent>

        <TabsContent value="budget" className="mt-6">
          <ProjectBudgetOverview projectId={id} />
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <ProjectResourcesTable projectId={id} />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Suspense fallback={<div>Loading timeline...</div>}>
            <ProjectTimeline projectId={id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <ProjectDocuments projectId={id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
