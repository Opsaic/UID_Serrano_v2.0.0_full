import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    let query = supabase.from("materials_library").select("*").eq("status", "active")

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query.order("material_name")

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] GET /materials error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const { data, error } = await supabase
      .from("materials_library")
      .insert([{ ...body, status: "active" }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err: any) {
    console.error("[v0] POST /materials error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updates } = body

    const { data, error } = await supabase.from("materials_library").update(updates).eq("id", id).select().single()

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] PATCH /materials error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
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
      return NextResponse.json({ error: "Material ID required" }, { status: 400 })
    }

    // Soft delete by setting status to inactive
    const { error } = await supabase.from("materials_library").update({ status: "inactive" }).eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error("[v0] DELETE /materials error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
