import { Suspense } from "react"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectTasks } from "@/components/projects/project-tasks"
import { ProjectTimeline } from "@/components/projects/project-timeline"
import { ProjectResources } from "@/components/projects/project-resources"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: project } = await supabase.from("projects").select("*, companies(name)").eq("id", params.id).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <ProjectHeader project={project} />

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <Suspense fallback={<div>Loading tasks...</div>}>
            <ProjectTasks projectId={params.id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Suspense fallback={<div>Loading timeline...</div>}>
            <ProjectTimeline projectId={params.id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Suspense fallback={<div>Loading resources...</div>}>
            <ProjectResources projectId={params.id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">Documents coming soon</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
