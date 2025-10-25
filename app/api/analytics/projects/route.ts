import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
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

    // Fetch projects with financial data
    const { data: projects, error } = await supabase
      .from("projects")
      .select(`
        id,
        name,
        status,
        budget,
        actual_cost,
        completion_percentage
      `)
      .in("status", ["in_progress", "planning", "on_hold"])
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) throw error

    const result = projects?.map((project) => ({
      id: project.id,
      name: project.name,
      status: project.status,
      budget: Number.parseFloat(project.budget || "0"),
      actual_cost: Number.parseFloat(project.actual_cost || "0"),
      completion: project.completion_percentage || 0,
    }))

    return NextResponse.json(result || [])
  } catch (error) {
    console.error("[v0] Error fetching project data:", error)
    return NextResponse.json({ error: "Failed to fetch project data" }, { status: 500 })
  }
}
