import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { streamText } from "ai"

export async function POST(request: Request) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { message, conversation_history = [] } = await request.json()

    // This uses the OPENAI_API_KEY from environment variables automatically
    const result = await streamText({
      model: "openai/gpt-4o-mini",
      system:
        "You are an AI assistant for Serrano, a door manufacturing and installation business management system. Help users with project estimates, financial analysis, CRM insights, and business operations. Be concise and professional.",
      messages: [
        ...conversation_history.map((msg: any) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        {
          role: "user" as const,
          content: message,
        },
      ],
      temperature: 0.7,
      maxTokens: 500,
    })

    // Convert stream to text
    let response = ""
    for await (const chunk of result.textStream) {
      response += chunk
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[v0] AI chat error:", error)
    return NextResponse.json({ error: "Chat failed. Please ensure OPENAI_API_KEY is configured." }, { status: 500 })
  }
}
