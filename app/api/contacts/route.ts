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

  let query = supabase
    .from("contacts")
    .select(`
      *,
      companies:company_id(name)
    `)
    .order("last_name", { ascending: true })

  if (companyId) {
    query = query.eq("company_id", companyId)
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
  const { company_id, first_name, last_name, title, email, phone, mobile, is_primary, notes } = body

  const { data, error } = await supabase
    .from("contacts")
    .insert({
      company_id,
      first_name,
      last_name,
      title,
      email,
      phone,
      mobile,
      is_primary: is_primary || false,
      notes,
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
    .from("contacts")
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

  const { error } = await supabase.from("contacts").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
