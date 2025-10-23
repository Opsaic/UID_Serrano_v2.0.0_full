import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function GET(){
  const { data:logs,error } = await supabase.from("audit_log").select("timestamp,action").order("timestamp",{ascending:false}).limit(100);
  if(error) return NextResponse.json({error:error.message},{status:400});
  const hours=logs.map((l:any)=>new Date(l.timestamp).getHours());
  const anomalies=hours.filter(h=>h<6||h>22).length;
  const riskScore=anomalies>10?"High":anomalies>5?"Medium":"Low";
  return NextResponse.json({entries:logs.length,offHourActions:anomalies,riskScore});
}
