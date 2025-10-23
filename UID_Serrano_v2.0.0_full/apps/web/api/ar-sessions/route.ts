import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data,error } = await supabase.from("ar_sessions").select("*").order("timestamp",{ascending:false});
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data??[]);
}
export async function POST(req:Request){
  const body=await req.json();
  const { project_id,user_id,data }=body||{};
  const { data:inserted,error } = await supabase.from("ar_sessions")
    .insert({ project_id,user_id,data }).select().single();
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(inserted);
}
