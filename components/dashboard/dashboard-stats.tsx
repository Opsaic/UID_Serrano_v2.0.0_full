import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, FolderKanban, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function DashboardStats() {
  const supabase = await createClient()

  const now = new Date()
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
  const firstDayTwoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString()

  const [
    projectsThisMonth,
    projectsLastMonth,
    companiesThisMonth,
    companiesLastMonth,
    opportunitiesThisMonth,
    opportunitiesLastMonth,
    paymentsThisMonth,
    paymentsLastMonth,
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact" }).gte("created_at", firstDayThisMonth),
    supabase
      .from("projects")
      .select("id", { count: "exact" })
      .gte("created_at", firstDayLastMonth)
      .lt("created_at", firstDayThisMonth),
    supabase.from("companies").select("id", { count: "exact" }).gte("created_at", firstDayThisMonth),
    supabase
      .from("companies")
      .select("id", { count: "exact" })
      .gte("created_at", firstDayLastMonth)
      .lt("created_at", firstDayThisMonth),
    supabase.from("opportunities").select("id", { count: "exact" }).gte("created_at", firstDayThisMonth),
    supabase
      .from("opportunities")
      .select("id", { count: "exact" })
      .gte("created_at", firstDayLastMonth)
      .lt("created_at", firstDayThisMonth),
    supabase.from("payments").select("amount").gte("payment_date", firstDayThisMonth),
    supabase
      .from("payments")
      .select("amount")
      .gte("payment_date", firstDayLastMonth)
      .lt("payment_date", firstDayThisMonth),
  ])

  const revenueThisMonth = paymentsThisMonth.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0
  const revenueLastMonth = paymentsLastMonth.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0
  const revenueChange = revenueLastMonth > 0 ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100 : 0

  const projectsChange =
    (projectsLastMonth.count || 0) > 0
      ? (((projectsThisMonth.count || 0) - (projectsLastMonth.count || 0)) / (projectsLastMonth.count || 1)) * 100
      : 0

  const companiesChange =
    (companiesLastMonth.count || 0) > 0
      ? (((companiesThisMonth.count || 0) - (companiesLastMonth.count || 0)) / (companiesLastMonth.count || 1)) * 100
      : 0

  const opportunitiesChange =
    (opportunitiesLastMonth.count || 0) > 0
      ? (((opportunitiesThisMonth.count || 0) - (opportunitiesLastMonth.count || 0)) /
          (opportunitiesLastMonth.count || 1)) *
        100
      : 0

  const stats = [
    {
      title: "Total Revenue",
      value: `$${revenueThisMonth.toLocaleString()}`,
      change: `${revenueChange >= 0 ? "+" : ""}${revenueChange.toFixed(1)}%`,
      icon: DollarSign,
      trend: revenueChange >= 0 ? "up" : "down",
    },
    {
      title: "Active Projects",
      value: (projectsThisMonth.count || 0).toString(),
      change: `${projectsChange >= 0 ? "+" : ""}${projectsChange.toFixed(1)}%`,
      icon: FolderKanban,
      trend: projectsChange >= 0 ? "up" : "down",
    },
    {
      title: "Total Clients",
      value: (companiesThisMonth.count || 0).toString(),
      change: `${companiesChange >= 0 ? "+" : ""}${companiesChange.toFixed(1)}%`,
      icon: Users,
      trend: companiesChange >= 0 ? "up" : "down",
    },
    {
      title: "Opportunities",
      value: (opportunitiesThisMonth.count || 0).toString(),
      change: `${opportunitiesChange >= 0 ? "+" : ""}${opportunitiesChange.toFixed(1)}%`,
      icon: TrendingUp,
      trend: opportunitiesChange >= 0 ? "up" : "down",
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
