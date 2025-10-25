import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)

    if (requestUrl.searchParams.has("_rsc")) {
      return new NextResponse(null, { status: 204 })
    }

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
  } catch (error) {
    console.error("[v0] Profile redirect error:", error)
    return new NextResponse(null, { status: 204 })
  }
}
