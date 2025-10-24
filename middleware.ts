// middleware.ts – simplified proxy only
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// Edge-safe matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
