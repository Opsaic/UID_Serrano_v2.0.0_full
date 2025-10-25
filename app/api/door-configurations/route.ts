import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET - Fetch configurations for authenticated user
export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("door_configurations")
      .select("*")
      .eq("created_by", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] GET /door-configurations error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST - Create new door configuration
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
    const { model_id, width_in, height_in, material_id, finish, glass_type, swing, jamb_type, handle_style, metadata } =
      body

    const { data, error } = await supabase
      .from("door_configurations")
      .insert([
        {
          created_by: user.id,
          model_id,
          width_in,
          height_in,
          material_id,
          finish,
          glass_type,
          swing,
          jamb_type,
          handle_style,
          metadata,
          status: "draft",
        },
      ])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err: any) {
    console.error("[v0] POST /door-configurations error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PATCH - Update existing configuration
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

    const { data, error } = await supabase
      .from("door_configurations")
      .update(updates)
      .eq("id", id)
      .eq("created_by", user.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] PATCH /door-configurations error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
