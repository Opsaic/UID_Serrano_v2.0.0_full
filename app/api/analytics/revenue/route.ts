import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const supabase = await createServerClient()

    // Get user session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const months = Number.parseInt(searchParams.get("months") || "6")

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - months)

    // Fetch revenue data from invoices
    const { data: invoices, error: invoicesError } = await supabase
      .from("invoices")
      .select("amount, status, issue_date")
      .gte("issue_date", startDate.toISOString())
      .lte("issue_date", endDate.toISOString())

    if (invoicesError) throw invoicesError

    // Fetch expenses data
    const { data: expenses, error: expensesError } = await supabase
      .from("expenses")
      .select("amount, date")
      .gte("date", startDate.toISOString())
      .lte("date", endDate.toISOString())

    if (expensesError) throw expensesError

    // Aggregate by month
    const monthlyData: Record<string, { revenue: number; expenses: number }> = {}

    // Process invoices
    invoices?.forEach((invoice) => {
      if (invoice.status === "paid" || invoice.status === "sent") {
        const month = new Date(invoice.issue_date).toLocaleDateString("en-US", { month: "short" })
        if (!monthlyData[month]) monthlyData[month] = { revenue: 0, expenses: 0 }
        monthlyData[month].revenue += Number.parseFloat(invoice.amount || "0")
      }
    })

    // Process expenses
    expenses?.forEach((expense) => {
      const month = new Date(expense.date).toLocaleDateString("en-US", { month: "short" })
      if (!monthlyData[month]) monthlyData[month] = { revenue: 0, expenses: 0 }
      monthlyData[month].expenses += Number.parseFloat(expense.amount || "0")
    })

    // Convert to array format
    const result = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      revenue: Math.round(data.revenue),
      expenses: Math.round(data.expenses),
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error fetching revenue data:", error)
    return NextResponse.json({ error: "Failed to fetch revenue data" }, { status: 500 })
  }
}
