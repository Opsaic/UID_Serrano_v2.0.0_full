import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data,error } = await supabase.from("users").select("id,email,role").order("email",{ascending:true});
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data??[]);
}
export async function POST(req:Request){
  const body=await req.json();
  const { id,role }=body||{};
  const { data,error } = await supabase.from("users").update({role}).eq("id",id).select().single();
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json(data);
}
