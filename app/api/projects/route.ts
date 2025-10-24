import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description, type, priority, start_date, end_date, budget } = body

  // Generate project number
  const projectNumber = `PRJ-${Date.now()}`

  const { data, error } = await supabase
    .from("projects")
    .insert({
      project_number: projectNumber,
      name,
      description,
      type,
      status: "planning",
      priority,
      start_date,
      end_date,
      budget,
      progress: 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
