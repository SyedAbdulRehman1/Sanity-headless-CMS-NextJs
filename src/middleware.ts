import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract token from cookies or headers
  const token = request.cookies.get("accessToken")?.value;

  // Define protected routes
  const protectedRoutes = ["/article"]; // Add any protected routes here

  // Redirect logged-in users away from the login page
  if (request.nextUrl.pathname === "/login" && token) {
    // Redirect to a different page (e.g., home or dashboard)
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Redirect to login if trying to access protected routes without a token
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) &&
    !token
  ) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if no conditions are met
  return NextResponse.next();
}
