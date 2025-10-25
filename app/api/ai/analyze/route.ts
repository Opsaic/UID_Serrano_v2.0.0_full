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
    const { document_url, analysis_type } = await request.json()

    // In production, integrate with AI service (OpenAI, Anthropic, etc.)
    const mockAnalysis = {
      type: "Invoice",
      key_info: ["Invoice #12345", "Due Date: 2025-02-15", "Amount: $5,000"],
      summary: "This is a standard invoice for door installation services with net 30 payment terms.",
      confidence: 0.95,
    }

    return NextResponse.json(mockAnalysis)
  } catch (error) {
    console.error("[v0] AI analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
