import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", requestUrl.origin))
  }

  // Redirect to dashboard if authenticated
  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
}
