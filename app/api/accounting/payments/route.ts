import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  const { data, error } = await supabase.from("payments").select("*").order("payment_date", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { amount, payment_date, payment_method, reference_number } = body

  const paymentNumber = `PAY-${Date.now()}`

  const { data, error } = await supabase
    .from("payments")
    .insert({
      payment_number: paymentNumber,
      amount,
      payment_date,
      payment_method,
      reference_number,
      status: "completed",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
