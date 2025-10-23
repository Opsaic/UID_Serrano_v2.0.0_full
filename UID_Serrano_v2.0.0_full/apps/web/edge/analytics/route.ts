import { NextResponse } from "next/server";
export const runtime = "edge";
export async function GET() {
  const res = await fetch("https://uid-serrano-v1-0-0-qe8q9tpof-jeff-7117s-projects.vercel.app/api/analytics",{next:{revalidate:60}});
  const data = await res.json();
  return NextResponse.json(data,{headers:{"Cache-Control":"s-maxage=60"}});
}
