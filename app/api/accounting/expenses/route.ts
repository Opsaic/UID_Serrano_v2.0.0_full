import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  const { data, error } = await supabase.from("expenses").select("*").order("expense_date", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { category, description, amount, expense_date, vendor, payment_method } = body

  const expenseNumber = `EXP-${Date.now()}`

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      expense_number: expenseNumber,
      category,
      description,
      amount,
      expense_date,
      vendor,
      payment_method,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
