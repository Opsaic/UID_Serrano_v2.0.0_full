import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/door-configurations/price?id=uuid
export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing configuration ID" }, { status: 400 })
    }

    const { data, error } = await supabase.from("configuration_pricing").select("*").eq("configuration_id", id).single()

    if (error) throw error

    return NextResponse.json(
      {
        configuration_id: data.configuration_id,
        total_price: data.total_price,
        materials_cost: data.materials_cost,
        freight_cost: data.freight_cost,
      },
      { status: 200 },
    )
  } catch (err: any) {
    console.error("[v0] GET /door-configurations/price error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
