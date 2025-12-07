import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Istok_Web } from "next/font/google";
import { redirect } from "next/dist/server/api-utils";

export async function middleware(request: NextRequest) {
  // 1. DEBUG LOG: Prove the file is running
  // console.log("This is request",request)
  console.log("🔥 MIDDLEWARE HIT:", request.nextUrl.pathname);

  const accessToken = request.cookies.get("accessToken")
  const path = request.nextUrl.pathname
  console.log("This is path", path)

  const isProtectedRoute = path.startsWith("/admin") || path.startsWith("/movie")

  console.log("isprotected", isProtectedRoute)



  // if (isProtectedRoute && !accessToken) {
  //   // return NextResponse.redirect(new URL("/login", request.url))
  //   // return { message: "Access token required , please relogin" }
  //   return new Response(JSON.stringify({ message: "Access token required , please relogin" }), { status: 401 });


  // }

  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

  try {
    await jwtVerify(accessToken?.value!, secret)

  } catch (error: any) {
    console.error("JWT Verification Failed:", error.code, error.message);

    // 2. Return a generic, safe message to the USER based on the error code
    if (error.code === 'ERR_JWT_EXPIRED') {
      // Handle Expiration: Ask user to refresh token or login again
      return new Response(JSON.stringify({ message: "Session expired. Please log in again." }), { status: 401 });
    }

    else if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
      // Handle Invalid Signature: This is a security risk or config error
      return new Response(JSON.stringify({ message: "Invalid token." }), { status: 401 });
    }

    else {
      // Handle other errors (malformed token, etc.)
      return new Response(JSON.stringify({ message: "Authentication failed." }), { status: 400 });
    }
  }








  // 2. Get Token (Check both names to be safe)
  // const cookie = request.cookies.get("accessToken") || request.cookies.get("token");
  // const token = cookie?.value;

  // console.log("🍪 Token status:", token ? "FOUND" : "MISSING");

  // const path = request.nextUrl.pathname;
  // const isProtectedRoute = path.startsWith("/admin") || path.startsWith("/book");
  // const isPublicRoute = path === "/login" || path === "/register";

  // SCENARIO 1: Protected Route + No Token -> Redirect to Login

  // false && 
  // true && 
  // if (isProtectedRoute && !token) {
  //   console.log("⛔ Access Denied: Redirecting to login");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // SCENARIO 2: Public Route + Token -> Redirect to Admin (Already Logged In)
  // if (isPublicRoute && token) {
  //   console.log("✅ Already Logged In: Redirecting to Dashboard");
  //   return NextResponse.redirect(new URL("/admin/movies", request.url));
  // }

  // SCENARIO 3: Verify Token Validity
  // if (token) {
  //   try {
  //     const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || "");
  //     const { payload } = await jwtVerify(token, secret);

  //     // Role Check for Admin Routes
  //     if (path.startsWith("/admin") && payload.role !== "ADMIN") {
  //       console.log("⛔ Role Mismatch: Redirecting to Home");
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //   } catch (error) {
  //     console.error("❌ Token Invalid:", error);
  //     // Token is bad? Delete it and send to login
  //     const response = NextResponse.redirect(new URL("/login", request.url));
  //     response.cookies.delete("accessToken");
  //     response.cookies.delete("token");
  //     return response;
  //   }
  // }

  return NextResponse.next();
}

// Ensure this matches the routes you want to protect
export const config = {
  matcher: [
    // "/admin/:path*",
    // "/book/:path*",
    // "/login",
    // "/register",
    "/admin/:path*",
    // "/movie/:movieid/shows/seats",
    // "/"
  ],
};