import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data, error } = await supabase.from("users").select("*").limit(100);
  if(error) return NextResponse.json({ error: error.message },{status:400});
  return NextResponse.json(data);
}
