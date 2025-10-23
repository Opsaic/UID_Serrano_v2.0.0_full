import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data,error } = await supabase.from("schedule_events").select("*").order("start",{ascending:true});
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data??[]);
}
export async function POST(req:Request){
  const body=await req.json();
  const { title,start,end,project_id }=body||{};
  const { data,error } = await supabase.from("schedule_events").insert({ title,start,end,project_id }).select().single();
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data);
}
