import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logError } from "@/lib/error-logger"

export async function GET(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user || null

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("market_verticals")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true })

    if (error) {
      console.error("[v0] Market verticals fetch error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    logError(error, { context: "GET /api/market-verticals" })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
