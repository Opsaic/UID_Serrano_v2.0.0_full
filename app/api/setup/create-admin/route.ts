import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const adminExists = existingUsers?.users?.some((u) => u.email === "admin@serrano.ai")

    if (adminExists) {
      return NextResponse.json({
        success: true,
        message: "Admin user already exists",
        email: "admin@serrano.ai",
      })
    }

    // Create the auth user with email verification bypassed
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: "admin@serrano.ai",
      password: "TestPass123!",
      email_confirm: true,
      user_metadata: {
        full_name: "System Administrator",
      },
    })

    if (authError) {
      return NextResponse.json({ error: `Auth error: ${authError.message}` }, { status: 500 })
    }

    // Create the profile entry
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: authData.user.id,
      email: "admin@serrano.ai",
      full_name: "System Administrator",
      role: "admin",
      is_active: true,
    })

    if (profileError) {
      return NextResponse.json({ error: `Profile error: ${profileError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      email: "admin@serrano.ai",
      password: "TestPass123!",
      userId: authData.user.id,
      emailVerified: true,
    })
  } catch (error) {
    return NextResponse.json({ error: `Unexpected error: ${error}` }, { status: 500 })
  }
}
