import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { company_name, contact_name, email, phone, source, estimated_value } = body

  const { data, error } = await supabase
    .from("leads")
    .insert({
      company_name,
      contact_name,
      email,
      phone,
      source,
      estimated_value,
      status: "new",
      score: 0,
      probability: 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
