// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const p = url.pathname;

  if (p === "/auth/confirm" || p === "/auth/v1/verify" || p === "/verify") {
    url.pathname = "/auth/callback"; // conserva ?code=...
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/auth/:path*", "/verify"] };
