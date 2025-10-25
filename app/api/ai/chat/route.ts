import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { OpenAI } from "openai"

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

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.warn("[v0] OpenAI API key not configured, using mock response")
      const mockResponse = `I understand you're asking about "${message}". Based on your business data, I can help you with project estimates, financial analysis, or CRM insights. What would you like to know more about?`
      return NextResponse.json({ response: mockResponse })
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Build conversation context
    const messages = [
      {
        role: "system" as const,
        content:
          "You are an AI assistant for Serrano, a door manufacturing and installation business management system. Help users with project estimates, financial analysis, CRM insights, and business operations. Be concise and professional.",
      },
      ...conversation_history.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ]

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response."

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[v0] AI chat error:", error)
    return NextResponse.json({ error: "Chat failed. Please try again." }, { status: 500 })
  }
}
