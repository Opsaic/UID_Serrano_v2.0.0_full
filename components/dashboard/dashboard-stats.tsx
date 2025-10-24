import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, FolderKanban, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function DashboardStats() {
  const supabase = await createClient()

  const [projectsResult, companiesResult, opportunitiesResult] = await Promise.all([
    supabase.from("projects").select("id, status", { count: "exact" }),
    supabase.from("companies").select("id", { count: "exact" }),
    supabase.from("opportunities").select("value", { count: "exact" }),
  ])

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Active Projects",
      value: projectsResult.count?.toString() || "0",
      change: "+12.5%",
      icon: FolderKanban,
      trend: "up",
    },
    {
      title: "Total Clients",
      value: companiesResult.count?.toString() || "0",
      change: "+8.2%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Opportunities",
      value: opportunitiesResult.count?.toString() || "0",
      change: "+15.3%",
      icon: TrendingUp,
      trend: "up",
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
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
