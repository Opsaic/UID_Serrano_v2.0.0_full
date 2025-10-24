import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { status } = body

  const { data, error } = await supabase.from("tasks").update({ status }).eq("id", params.id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
