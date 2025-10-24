import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { title, description, subtotal, tax_rate, tax_amount, total, valid_until } = body

  // Generate quote number
  const quoteNumber = `QT-${Date.now()}`

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      quote_number: quoteNumber,
      title,
      description,
      subtotal,
      tax_rate,
      tax_amount,
      total,
      valid_until,
      status: "draft",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
