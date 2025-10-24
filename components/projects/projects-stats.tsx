import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function ProjectsStats() {
  const supabase = await createClient()

  const [totalResult, activeResult, completedResult, delayedResult] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact" }),
    supabase.from("projects").select("id", { count: "exact" }).eq("status", "active"),
    supabase.from("projects").select("id", { count: "exact" }).eq("status", "completed"),
    supabase.from("projects").select("id", { count: "exact" }).eq("status", "delayed"),
  ])

  const stats = [
    {
      title: "Total Projects",
      value: totalResult.count?.toString() || "0",
      icon: FolderKanban,
      color: "text-blue-600",
    },
    {
      title: "Active",
      value: activeResult.count?.toString() || "0",
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Completed",
      value: completedResult.count?.toString() || "0",
      icon: CheckCircle2,
      color: "text-purple-600",
    },
    {
      title: "Delayed",
      value: delayedResult.count?.toString() || "0",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
