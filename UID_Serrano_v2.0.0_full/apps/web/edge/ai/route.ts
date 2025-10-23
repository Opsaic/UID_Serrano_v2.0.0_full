import { NextResponse } from "next/server";
import OpenAI from "openai";
export const runtime = "edge";
export async function POST(req: Request) {
  const { description } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Edge estimate for: ${description}`;
  const r = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Quick estimate mode." },
      { role: "user", content: prompt }
    ]
  });
  return NextResponse.json({ estimate: r.choices[0].message.content });
}
