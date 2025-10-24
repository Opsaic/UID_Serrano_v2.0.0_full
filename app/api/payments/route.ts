import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get("company_id")
  const invoiceId = searchParams.get("invoice_id")

  let query = supabase
    .from("payments")
    .select(`
      *,
      companies:company_id(name),
      invoices:invoice_id(invoice_number, total)
    `)
    .order("payment_date", { ascending: false })

  if (companyId) {
    query = query.eq("company_id", companyId)
  }
  if (invoiceId) {
    query = query.eq("invoice_id", invoiceId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { invoice_id, company_id, amount, payment_date, payment_method, reference_number, notes } = body

  const paymentNumber = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

  const { data, error } = await supabase
    .from("payments")
    .insert({
      payment_number: paymentNumber,
      invoice_id,
      company_id,
      amount,
      payment_date,
      payment_method,
      reference_number,
      notes,
      status: "completed",
      created_by: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function PATCH(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { id, ...updates } = body

  const { data, error } = await supabase.from("payments").update(updates).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user || null

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  const { error } = await supabase.from("payments").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
