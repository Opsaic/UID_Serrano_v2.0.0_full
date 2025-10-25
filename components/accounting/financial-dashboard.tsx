import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"

interface FinancialDashboardProps {
  data: {
    totalRevenue: number
    totalExpenses: number
    netProfit: number
    outstandingInvoices: number
    revenueByMonth: Array<{ month: string; amount: number }>
    expensesByCategory: Array<{ category: string; amount: number }>
  }
}

export function FinancialDashboard({ data }: FinancialDashboardProps) {
  const profitMargin = data.totalRevenue > 0 ? ((data.netProfit / data.totalRevenue) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${data.totalRevenue.toLocaleString()}`}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Expenses"
          value={`$${data.totalExpenses.toLocaleString()}`}
          trend={{ value: 8.3, isPositive: false }}
        />
        <StatCard
          title="Net Profit"
          value={`$${data.netProfit.toLocaleString()}`}
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatCard title="Profit Margin" value={`${profitMargin}%`} trend={{ value: 2.1, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.revenueByMonth.map((item) => (
                <div key={item.month} className="flex justify-between items-center">
                  <span className="text-sm">{item.month}</span>
                  <span className="font-semibold">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.expensesByCategory.map((item) => (
                <div key={item.category} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{item.category}</span>
                  <span className="font-semibold">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
