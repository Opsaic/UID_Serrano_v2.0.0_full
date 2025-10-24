import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

export async function ProjectTimeline({ projectId }: { projectId: string }) {
  const supabase = await createClient()

  const { data: phases } = await supabase
    .from("project_phases")
    .select("*")
    .eq("project_id", projectId)
    .order("sequence", { ascending: true })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>View project phases and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        {phases && phases.length > 0 ? (
          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div key={phase.id} className="relative pl-8 pb-6 border-l-2 border-border last:border-l-0 last:pb-0">
                <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-accent border-2 border-background" />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{phase.name}</h3>
                    <span className="text-sm text-muted-foreground">{phase.progress || 0}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {phase.start_date && <span>Start: {format(new Date(phase.start_date), "MMM d, yyyy")}</span>}
                    {phase.end_date && <span>End: {format(new Date(phase.end_date), "MMM d, yyyy")}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No phases defined</div>
        )}
      </CardContent>
    </Card>
  )
}
