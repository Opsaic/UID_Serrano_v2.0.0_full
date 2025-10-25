import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")
  const industry = searchParams.get("industry")
  const market_vertical = searchParams.get("market_vertical")
  const territory = searchParams.get("territory")
  const account_type = searchParams.get("account_type")

  let query = supabase.from("companies").select("*").order("name", { ascending: true })

  if (status) {
    query = query.eq("status", status)
  }
  if (industry) {
    query = query.eq("industry", industry)
  }
  if (market_vertical) {
    query = query.eq("market_vertical", market_vertical)
  }
  if (territory) {
    query = query.eq("territory", territory)
  }
  if (account_type) {
    query = query.eq("account_type", account_type)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const {
    name,
    email,
    phone,
    website,
    industry,
    address,
    tax_id,
    credit_limit,
    payment_terms,
    notes,
    market_vertical,
    account_type,
    territory,
    preferred_pricing_tier,
    annual_revenue,
  } = body

  const { data, error } = await supabase
    .from("companies")
    .insert({
      name,
      email,
      phone,
      website,
      industry,
      address: address || {},
      tax_id,
      credit_limit,
      payment_terms,
      notes,
      status: "active",
      created_by: user.id,
      market_vertical,
      account_type: account_type || "standard",
      territory: territory || "National",
      preferred_pricing_tier: preferred_pricing_tier || "Standard",
      annual_revenue,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function PATCH(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { id, ...updates } = body

  const { data, error } = await supabase
    .from("companies")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  const { error } = await supabase.from("companies").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
