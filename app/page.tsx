import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, DollarSign, Clock, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Active Estimates",
      value: "12",
      icon: FileText,
      description: "+2 from last week",
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      icon: DollarSign,
      description: "+12% from last month",
    },
    {
      title: "Avg. Response Time",
      value: "2.4 hrs",
      icon: Clock,
      description: "-0.5 hrs from last week",
    },
    {
      title: "Conversion Rate",
      value: "68%",
      icon: TrendingUp,
      description: "+5% from last month",
    },
  ]

  const recentEstimates = [
    { id: "EST-001", client: "Acme Corp", doors: 24, status: "Pending", amount: "$12,400" },
    { id: "EST-002", client: "BuildCo", doors: 18, status: "Approved", amount: "$9,200" },
    { id: "EST-003", client: "Metro Design", doors: 32, status: "In Review", amount: "$16,800" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Here's an overview of your door estimation business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Estimates</CardTitle>
            <CardDescription>Your latest door configuration estimates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEstimates.map((estimate) => (
                <div
                  key={estimate.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-medium text-foreground">{estimate.id}</div>
                    <div className="text-sm text-muted-foreground">{estimate.client}</div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-sm text-muted-foreground">{estimate.doors} doors</div>
                    <div className="text-sm font-medium text-foreground">{estimate.amount}</div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        estimate.status === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : estimate.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {estimate.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
