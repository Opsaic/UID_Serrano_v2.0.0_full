import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { logError } from "@/lib/error-logger"

export async function POST(request: Request) {
  try {
    console.log("[v0] Starting report generation")
    const supabase = await createServerClient()

    // Get user session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] Unauthorized report generation attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const config = await request.json()
    console.log("[v0] Report config:", config)

    const reportData: any = {
      title: config.title || "Business Report",
      generatedAt: new Date().toISOString(),
      generatedBy: user.email,
      dateRange: config.dateRange,
      reportType: config.reportType,
    }

    // Fetch data based on report type
    switch (config.reportType) {
      case "financial":
        const { data: invoices } = await supabase
          .from("invoices")
          .select("*")
          .gte("issue_date", config.dateRange?.start || "2024-01-01")
          .lte("issue_date", config.dateRange?.end || "2025-12-31")

        const { data: expenses } = await supabase
          .from("expenses")
          .select("*")
          .gte("expense_date", config.dateRange?.start || "2024-01-01")
          .lte("expense_date", config.dateRange?.end || "2025-12-31")

        reportData.data = {
          invoices: invoices || [],
          expenses: expenses || [],
          totalRevenue: invoices?.reduce((sum, inv) => sum + (inv.total || 0), 0) || 0,
          totalExpenses: expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0,
        }
        break

      case "project":
        const { data: projects } = await supabase
          .from("projects")
          .select("*, company:companies(name)")
          .gte("start_date", config.dateRange?.start || "2024-01-01")
          .lte("start_date", config.dateRange?.end || "2025-12-31")

        reportData.data = {
          projects: projects || [],
          totalProjects: projects?.length || 0,
          totalBudget: projects?.reduce((sum, proj) => sum + (proj.budget || 0), 0) || 0,
        }
        break

      case "sales":
        const { data: opportunities } = await supabase
          .from("opportunities")
          .select("*, company:companies(name)")
          .gte("created_at", config.dateRange?.start || "2024-01-01")
          .lte("created_at", config.dateRange?.end || "2025-12-31")

        reportData.data = {
          opportunities: opportunities || [],
          totalValue: opportunities?.reduce((sum, opp) => sum + (opp.value || 0), 0) || 0,
          wonDeals: opportunities?.filter((o) => o.status === "won").length || 0,
        }
        break

      default:
        reportData.data = {
          message: "Report type not specified. Available types: financial, project, sales",
        }
    }

    console.log("[v0] Report generated successfully")

    // Return JSON report data
    // In production, this could be enhanced with PDF generation using libraries like:
    // - @react-pdf/renderer for React-based PDFs
    // - puppeteer for HTML-to-PDF conversion
    // - pdfkit for programmatic PDF generation
    return NextResponse.json(reportData)
  } catch (error) {
    console.error("[v0] Error generating report:", error)
    logError(error, { context: "report_generation" })
    return NextResponse.json(
      { error: "Failed to generate report", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
