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
  const companyId = searchParams.get("company_id")
  const status = searchParams.get("status")

  let query = supabase
    .from("quotes")
    .select(`
      *,
      companies:company_id(name),
      contacts:contact_id(first_name, last_name, email),
      opportunities:opportunity_id(name, stage)
    `)
    .order("created_at", { ascending: false })

  if (companyId) {
    query = query.eq("company_id", companyId)
  }
  if (status) {
    query = query.eq("status", status)
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
    company_id,
    contact_id,
    opportunity_id,
    title,
    description,
    valid_until,
    subtotal,
    tax_rate,
    tax_amount,
    total,
    line_items,
    terms,
    notes,
  } = body

  const quoteNumber = `QTE-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      quote_number: quoteNumber,
      company_id,
      contact_id,
      opportunity_id,
      title,
      description,
      valid_until,
      subtotal,
      tax_rate: tax_rate || 0,
      tax_amount: tax_amount || 0,
      total,
      line_items: line_items || [],
      terms,
      notes,
      status: "draft",
      created_by: user.id,
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
    .from("quotes")
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

  const { error } = await supabase.from("quotes").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
