import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get("project_id")
  const quoteId = searchParams.get("quote_id")

  let query = supabase
    .from("door_configurations")
    .select(`
      *,
      projects:project_id(name, project_number),
      quotes:quote_id(quote_number),
      models:model_id(name, thumbnail_url)
    `)
    .order("created_at", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }
  if (quoteId) {
    query = query.eq("quote_id", quoteId)
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
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const {
    project_id,
    quote_id,
    model_id,
    name,
    door_type,
    dimensions,
    materials,
    hardware,
    finish,
    glass_options,
    custom_features,
    price_breakdown,
    total_price,
  } = body

  const { data, error } = await supabase
    .from("door_configurations")
    .insert({
      project_id,
      quote_id,
      model_id,
      name,
      door_type: door_type || "custom",
      dimensions,
      materials: materials || {},
      hardware: hardware || {},
      finish: finish || {},
      glass_options: glass_options || {},
      custom_features: custom_features || [],
      price_breakdown: price_breakdown || {},
      total_price,
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
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { id, ...updates } = body

  const { data, error } = await supabase
    .from("door_configurations")
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
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  const { error } = await supabase.from("door_configurations").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
