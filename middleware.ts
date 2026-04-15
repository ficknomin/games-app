import { NextRequest, NextResponse } from "next/server";

// Routes that require a logged-in user
const PROTECTED_ROUTES: string[] = [];

// Routes that should not be accessible when already logged in
const AUTH_ROUTES = ["/signin", "/signup"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Case 1: trying to access a protected page without a session cookie
  if (isProtected && !token) {
    const loginUrl = new URL("/signin", req.url);
    loginUrl.searchParams.set("from", pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: trying to access /signin or /signup while already logged in
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/games", req.url));
  }

  // Case 3: all other requests pass through untouched
  return NextResponse.next();
}

// Tell Next.js which routes to run middleware on
// Without this, middleware runs on EVERY request including _next/static, favicon etc.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)"],
};
