import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data,error } = await supabase.from("projects").select("status");
  if(error) return NextResponse.json({error:error.message},{status:400});
  const summary:Record<string,number>={};
  (data||[]).forEach((p:any)=>{summary[p.status]=(summary[p.status]||0)+1;});
  return NextResponse.json(summary);
}
