import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data,error } = await supabase.from("integrations").select("*").order("created_at",{ascending:true});
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data??[]);
}
export async function POST(req:Request){
  const { provider,api_key } = await req.json();
  const { data,error } = await supabase.from("integrations").insert({ provider,api_key }).select().single();
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data);
}
