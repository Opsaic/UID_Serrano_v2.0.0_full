import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}

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
