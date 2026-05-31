import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Web Crypto SHA-256 helper for compatibility with Next.js Edge Runtime
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPath = pathname.startsWith("/admin");
  const isAdminApiPath = pathname.startsWith("/api/admin");

  const isAuthPage = pathname === "/admin/login";
  const isAuthApi = pathname === "/api/admin/login" || pathname === "/api/admin/logout";

  if ((isAdminPath && !isAuthPage) || (isAdminApiPath && !isAuthApi)) {
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const expectedToken = await sha256(adminPassword + "-session-salt");
    const sessionCookie = request.cookies.get("admin_session")?.value;

    if (!sessionCookie || sessionCookie !== expectedToken) {
      if (isAdminApiPath) {
        return NextResponse.json(
          { success: false, error: "Unauthorized access" },
          { status: 401 }
        );
      } else {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // If already authenticated and accessing login page, redirect to dashboard
  if (isAuthPage) {
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const expectedToken = await sha256(adminPassword + "-session-salt");
    const sessionCookie = request.cookies.get("admin_session")?.value;

    if (sessionCookie && sessionCookie === expectedToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
