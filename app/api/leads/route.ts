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
  const assignedTo = searchParams.get("assigned_to")

  let query = supabase
    .from("leads")
    .select(`
      *,
      assigned_user:assigned_to(full_name, email)
    `)
    .order("created_at", { ascending: false })

  if (status) {
    query = query.eq("status", status)
  }
  if (assignedTo) {
    query = query.eq("assigned_to", assignedTo)
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
    contact_name,
    company_name,
    email,
    phone,
    source,
    estimated_value,
    expected_close_date,
    probability,
    assigned_to,
    notes,
  } = body

  const { data, error } = await supabase
    .from("leads")
    .insert({
      contact_name,
      company_name,
      email,
      phone,
      source,
      estimated_value,
      expected_close_date,
      probability: probability || 0,
      assigned_to,
      notes,
      status: "new",
      score: 0,
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
    .from("leads")
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

  const { error } = await supabase.from("leads").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
