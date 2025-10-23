import { NextResponse } from "next/server";
export const runtime="edge";
export async function GET(){
  const start=Date.now();
  const res=await fetch("https://uid-serrano-v1-0-0-3e286rk5o-jeff-7117s-projects.vercel.app/api/analytics",{next:{revalidate:60}});
  const data=await res.json();
  const latency=Date.now()-start;
  return NextResponse.json({latency_ms:latency,analytics:data});
}
