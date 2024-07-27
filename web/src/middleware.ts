// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";
import Client from "./client";

const client = new Client();

export async function middleware(req: NextRequest) {
  // Log the incoming request URL for debugging
  console.log("Request URL:", req.url);

  // Parse cookies from the request headers
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Check if the token exists
  if (path.startsWith("/dashboard")) {
    if (!token) {
      console.log("Not logged in, redirecting to login page");
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // Verify the token
    const response = await client.auth.helper.verifyToken(token);

    if (response.status === false) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  } else if (path.startsWith("/auth")) {
    const response = await client.auth.helper.verifyToken(token);

    if (response.status === true) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
};
