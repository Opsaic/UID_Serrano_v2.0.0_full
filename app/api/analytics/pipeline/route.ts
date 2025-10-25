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

    // Fetch opportunities grouped by stage
    const { data: opportunities, error } = await supabase.from("opportunities").select("stage, value")

    if (error) throw error

    // Aggregate by stage
    const stageMap: Record<string, { count: number; value: number }> = {}

    opportunities?.forEach((opp) => {
      const stage = opp.stage || "unknown"
      if (!stageMap[stage]) stageMap[stage] = { count: 0, value: 0 }
      stageMap[stage].count++
      stageMap[stage].value += Number.parseFloat(opp.value || "0")
    })

    // Convert to array with proper stage names
    const stageOrder = ["prospecting", "qualification", "proposal", "negotiation", "closed_won"]
    const stageNames: Record<string, string> = {
      prospecting: "Prospecting",
      qualification: "Qualification",
      proposal: "Proposal",
      negotiation: "Negotiation",
      closed_won: "Closed Won",
    }

    const result = stageOrder
      .filter((stage) => stageMap[stage])
      .map((stage) => ({
        name: stageNames[stage] || stage,
        count: stageMap[stage].count,
        value: Math.round(stageMap[stage].value),
      }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error fetching pipeline data:", error)
    return NextResponse.json({ error: "Failed to fetch pipeline data" }, { status: 500 })
  }
}
