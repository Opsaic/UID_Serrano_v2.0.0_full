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
  const projectId = searchParams.get("project_id")
  const assignedTo = searchParams.get("assigned_to")
  const status = searchParams.get("status")

  let query = supabase
    .from("tasks")
    .select(`
      *,
      projects:project_id(name, project_number),
      assigned_user:assigned_to(full_name, email),
      phase:phase_id(name)
    `)
    .order("due_date", { ascending: true })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }
  if (assignedTo) {
    query = query.eq("assigned_to", assignedTo)
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
    project_id,
    phase_id,
    name,
    description,
    assigned_to,
    start_date,
    due_date,
    priority,
    estimated_hours,
    type,
    dependencies,
  } = body

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      project_id,
      phase_id,
      name,
      description,
      assigned_to,
      start_date,
      due_date,
      priority: priority || "medium",
      estimated_hours,
      type,
      dependencies: dependencies || {},
      status: "todo",
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

  // If status is being changed to completed, set completed_date
  if (updates.status === "completed" && !updates.completed_date) {
    updates.completed_date = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("tasks")
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

  const { error } = await supabase.from("tasks").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
