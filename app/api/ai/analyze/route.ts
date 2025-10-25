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
    const { document_text, analysis_type = "general" } = await request.json()

    if (!document_text) {
      return NextResponse.json({ error: "Document text is required" }, { status: 400 })
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.warn("[v0] OpenAI API key not configured, using mock response")
      const mockAnalysis = {
        type: "Invoice",
        key_info: ["Invoice #12345", "Due Date: 2025-02-15", "Amount: $5,000"],
        summary: "This is a standard invoice for door installation services with net 30 payment terms.",
        confidence: 0.95,
      }
      return NextResponse.json(mockAnalysis)
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Build analysis prompt
    const prompt = `Analyze the following document and extract key information. Return a JSON object with:
- type: The document type (Invoice, Contract, Quote, etc.)
- key_info: Array of the most important pieces of information
- summary: A brief summary of the document
- confidence: A confidence score between 0 and 1

Document:
${document_text}

Return only valid JSON, no additional text.`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a document analysis AI. Extract key information and provide structured analysis.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    })

    const analysisText = completion.choices[0]?.message?.content || "{}"
    const analysis = JSON.parse(analysisText)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("[v0] AI analysis error:", error)
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 })
  }
}
