import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { status, ...updates } = body

  const updateData: any = { ...updates, status, updated_at: new Date().toISOString() }
  if (status === "completed" && !updates.completed_date) {
    updateData.completed_date = new Date().toISOString()
  }

  const { data, error } = await supabase.from("tasks").update(updateData).eq("id", params.id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
