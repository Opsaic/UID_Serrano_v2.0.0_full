import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    let query = supabase
      .from("assemblies_library")
      .select(`
        *,
        assembly_materials (
          id,
          quantity,
          material_id,
          materials_library (
            material_name,
            unit_cost,
            unit_of_measure
          )
        )
      `)
      .eq("status", "active")

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query.order("assembly_name")

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] GET /assemblies error:", err.message)
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
    const { materials, ...assemblyData } = body

    // Insert assembly
    const { data: assembly, error: assemblyError } = await supabase
      .from("assemblies_library")
      .insert([{ ...assemblyData, status: "active" }])
      .select()
      .single()

    if (assemblyError) throw assemblyError

    // Insert assembly materials if provided
    if (materials && materials.length > 0) {
      const assemblyMaterials = materials.map((m: any) => ({
        assembly_id: assembly.id,
        material_id: m.material_id,
        quantity: m.quantity,
        notes: m.notes,
      }))

      const { error: materialsError } = await supabase.from("assembly_materials").insert(assemblyMaterials)

      if (materialsError) throw materialsError
    }

    return NextResponse.json(assembly, { status: 201 })
  } catch (err: any) {
    console.error("[v0] POST /assemblies error:", err.message)
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
    const { id, materials, ...updates } = body

    // Update assembly
    const { data, error } = await supabase.from("assemblies_library").update(updates).eq("id", id).select().single()

    if (error) throw error

    // Update materials if provided
    if (materials) {
      // Delete existing materials
      await supabase.from("assembly_materials").delete().eq("assembly_id", id)

      // Insert new materials
      if (materials.length > 0) {
        const assemblyMaterials = materials.map((m: any) => ({
          assembly_id: id,
          material_id: m.material_id,
          quantity: m.quantity,
          notes: m.notes,
        }))

        await supabase.from("assembly_materials").insert(assemblyMaterials)
      }
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] PATCH /assemblies error:", err.message)
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
      return NextResponse.json({ error: "Assembly ID required" }, { status: 400 })
    }

    // Soft delete by setting status to inactive
    const { error } = await supabase.from("assemblies_library").update({ status: "inactive" }).eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error("[v0] DELETE /assemblies error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
