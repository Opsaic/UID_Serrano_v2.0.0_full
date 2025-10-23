import { NextResponse } from "next/server";
import OpenAI from "openai";
export async function POST(req:Request){
  const { text,targetLang } = await req.json();
  const openai=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  try{
    const r=await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[
        {role:"system",content:"Translate accurately"},
        {role:"user",content:`Translate to ${targetLang}: ${text}`}
      ]
    });
    return NextResponse.json({translated:r.choices[0].message.content});
  }catch(err:any){
    return NextResponse.json({error:String(err.message||err)},{status:400});
  }
}
