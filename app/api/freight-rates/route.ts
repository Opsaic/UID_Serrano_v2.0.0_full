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

    const { data, error } = await supabase
      .from("freight_rates_cache")
      .select("*")
      .order("cached_at", { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("[v0] GET /freight-rates error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
