import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  console.log("[v0] Middleware invoked for path:", req.nextUrl.pathname)

  try {
    console.log("[v0] Environment check - SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing")
    console.log(
      "[v0] Environment check - SUPABASE_ANON_KEY:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing",
    )

    let response = NextResponse.next({
      request: {
        headers: req.headers,
      },
    })

    console.log("[v0] Creating Supabase client...")
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const value = req.cookies.get(name)?.value
            console.log("[v0] Cookie get:", name, value ? "✓ Found" : "✗ Not found")
            return value
          },
          set(name: string, value: string, options: CookieOptions) {
            console.log("[v0] Cookie set:", name)
            req.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: req.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            console.log("[v0] Cookie remove:", name)
            req.cookies.set({
              name,
              value: "",
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: req.headers,
              },
            })
            response.cookies.set({
              name,
              value: "",
              ...options,
            })
          },
        },
      },
    )

    console.log("[v0] Getting session...")
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("[v0] Session error:", sessionError)
    } else {
      console.log("[v0] Session status:", session ? "✓ Active" : "✗ No session")
      if (session) {
        console.log("[v0] User ID:", session.user.id)
        console.log("[v0] User email:", session.user.email)
      }
    }

    console.log("[v0] Getting user...")
    const { error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error("[v0] User error:", userError)
    } else {
      console.log("[v0] User check: ✓ Success")
    }

    // Protected routes that require authentication
    const protectedPaths = ["/", "/estimator", "/projects", "/settings", "/crm", "/accounting", "/visualizer"]
    const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))

    console.log("[v0] Path protection check:", isProtectedPath ? "✓ Protected" : "✗ Public")

    // Redirect to login if accessing protected route without session
    if (isProtectedPath && !session) {
      console.log("[v0] Redirecting to login - no session for protected path")
      const redirectUrl = new URL("/auth/login", req.url)
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect to home if accessing auth pages with active session
    if (req.nextUrl.pathname.startsWith("/auth") && session) {
      console.log("[v0] Redirecting to home - already authenticated")
      return NextResponse.redirect(new URL("/", req.url))
    }

    console.log("[v0] Middleware complete - allowing request")
    return response
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    throw error
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
