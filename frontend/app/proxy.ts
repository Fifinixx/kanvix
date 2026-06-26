import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hasToken = request.cookies.has("refreshToken");
  if (!hasToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/application", "/application/:path*"],
};

