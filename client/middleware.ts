import { auth } from "@/auth";
import { NextResponse } from "next/server";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const email = req.auth?.user?.email?.toLowerCase();
  const isLoggedIn = !!req.auth;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  if (isDashboardRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!email || email !== adminEmail) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (isLoginRoute && isLoggedIn && email === adminEmail) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};