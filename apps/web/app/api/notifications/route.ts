import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data,error } = await supabase.from("notifications").select("*").order("created_at",{ascending:false});
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data??[]);
}
export async function POST(req:Request){
  const body=await req.json();
  const { message,type="info" }=body||{};
  const { data,error } = await supabase.from("notifications").insert({ message,type }).select().single();
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data);
}
