import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function AccountingStats() {
  const supabase = await createClient()

  const [invoicesResult, paymentsResult, expensesResult] = await Promise.all([
    supabase.from("invoices").select("total, amount_paid"),
    supabase.from("payments").select("amount"),
    supabase.from("expenses").select("amount"),
  ])

  const totalInvoiced = invoicesResult.data?.reduce((sum, inv) => sum + (inv.total || 0), 0) || 0
  const totalPaid = paymentsResult.data?.reduce((sum, pay) => sum + (pay.amount || 0), 0) || 0
  const totalExpenses = expensesResult.data?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0
  const outstanding = totalInvoiced - totalPaid

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalPaid.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Outstanding",
      value: `$${outstanding.toLocaleString()}`,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Net Profit",
      value: `$${(totalPaid - totalExpenses).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-blue-600",
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
