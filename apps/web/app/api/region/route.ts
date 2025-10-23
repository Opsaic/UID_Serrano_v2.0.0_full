import { NextResponse } from "next/server";
export async function GET(req:Request){
  const lang=req.headers.get("accept-language")?.split(",")[0]||"en";
  const currency=lang.startsWith("es")?"MXN":lang.startsWith("fr")?"EUR":lang.startsWith("de")?"EUR":"USD";
  return NextResponse.json({lang,currency});
}
