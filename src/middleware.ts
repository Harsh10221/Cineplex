import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // 1. DEBUG LOG: Prove the file is running
  console.log("🔥 MIDDLEWARE HIT:", request.nextUrl.pathname);

  // 2. Get Token (Check both names to be safe)
  const cookie = request.cookies.get("accessToken") || request.cookies.get("token");
  const token = cookie?.value;

  console.log("🍪 Token status:", token ? "FOUND" : "MISSING");

  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith("/admin") || path.startsWith("/book");
  const isPublicRoute = path === "/login" || path === "/register";

  // SCENARIO 1: Protected Route + No Token -> Redirect to Login
  if (isProtectedRoute && !token) {
    console.log("⛔ Access Denied: Redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // SCENARIO 2: Public Route + Token -> Redirect to Admin (Already Logged In)
  if (isPublicRoute && token) {
    console.log("✅ Already Logged In: Redirecting to Dashboard");
    return NextResponse.redirect(new URL("/admin/movies", request.url));
  }

  // SCENARIO 3: Verify Token Validity
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || "");
      const { payload } = await jwtVerify(token, secret);

      // Role Check for Admin Routes
      if (path.startsWith("/admin") && payload.role !== "ADMIN") {
        console.log("⛔ Role Mismatch: Redirecting to Home");
        return NextResponse.redirect(new URL("/", request.url));
      }

    } catch (error) {
      console.error("❌ Token Invalid:", error);
      // Token is bad? Delete it and send to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

// Ensure this matches the routes you want to protect
export const config = {
  matcher: [
    "/admin/:path*",
    "/book/:path*",
    "/login",
    "/register"
  ],
};