import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data:tasks,error } = await supabase.from("tasks").select("status");
  if(error) return NextResponse.json({error:error.message},{status:400});
  const total=tasks.length;
  const completed=tasks.filter((t:any)=>t.status==="done").length;
  const pending=tasks.filter((t:any)=>t.status!=="done").length;
  const completionRate=total?((completed/total)*100).toFixed(1):0;
  const risk=pending>completed?"High":"Low";
  return NextResponse.json({total,completed,pending,completionRate,risk});
}
