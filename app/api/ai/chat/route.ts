import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { message } = await request.json()

    // In production, integrate with AI service (OpenAI, Anthropic, etc.)
    const mockResponse = `I understand you're asking about "${message}". Based on your business data, I can help you with project estimates, financial analysis, or CRM insights. What would you like to know more about?`

    return NextResponse.json({ response: mockResponse })
  } catch (error) {
    console.error("[v0] AI chat error:", error)
    return NextResponse.json({ error: "Chat failed" }, { status: 500 })
  }
}
