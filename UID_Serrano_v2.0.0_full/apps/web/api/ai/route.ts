import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { description, imageUrl } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const prompt = `Based on the door style described: "${description}", estimate design category, material, and cost.`;
    const r = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a restoration and design estimator." },
        { role: "user", content: prompt }
      ]
    });
    return NextResponse.json({ estimate: r.choices[0].message.content });
  } catch (e: any) {
    return NextResponse.json(
      { error: String(e?.message || e) },
      { status: 400 }
    );
  }
}
