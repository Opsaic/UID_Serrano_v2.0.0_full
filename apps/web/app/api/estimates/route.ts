import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { quantity, material, door_type, dimensions, custom_features } = body

  // Calculate pricing based on material and quantity
  const basePrices: Record<string, number> = {
    wood: 450,
    metal: 380,
    composite: 520,
    fiberglass: 480,
    steel: 420,
  }

  const basePrice = basePrices[material] || 450
  const partCost = basePrice
  const totalPartsCost = partCost * quantity

  // Calculate master pattern cost (15% of total)
  const masterPatternCost = totalPartsCost * 0.15

  // Calculate number of molds needed (1 mold per 10 parts)
  const numberOfMolds = Math.ceil(quantity / 10)

  // Calculate mold cost per mold (8% of total per mold)
  const moldCostPerMold = totalPartsCost * 0.08

  // Calculate total mold cost
  const totalMoldCost = moldCostPerMold * numberOfMolds

  // Calculate total cost
  const totalCost = masterPatternCost + totalMoldCost + totalPartsCost

  const priceBreakdown = {
    master_pattern_cost: Math.round(masterPatternCost),
    number_of_molds: numberOfMolds,
    mold_cost_per_mold: Math.round(moldCostPerMold),
    total_mold_cost: Math.round(totalMoldCost),
    part_cost: Math.round(partCost),
    total_parts_cost: Math.round(totalPartsCost),
    total_cost: Math.round(totalCost),
  }

  // Create door configuration record
  const { data, error } = await supabase
    .from("door_configurations")
    .insert({
      name: `${material} Door - ${quantity} units`,
      door_type: door_type || "custom",
      dimensions: dimensions || { width: 36, height: 80, thickness: 1.75 },
      materials: { primary: material, quantity },
      custom_features: custom_features || [],
      price_breakdown: priceBreakdown,
      total_price: priceBreakdown.total_cost,
      status: "estimated",
      created_by: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({
    estimate: data,
    breakdown: priceBreakdown,
  })
}
