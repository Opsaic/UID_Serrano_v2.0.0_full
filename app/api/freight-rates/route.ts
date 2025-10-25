import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("freight_rates_cache")
      .select("*")
      .order("cached_at", { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] GET /freight-rates error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
