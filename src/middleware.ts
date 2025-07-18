import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const authRoutes = ["/login", "/register"];
const privateRoutes = ["/add-debate", "/edit-debate"];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const userOnProtectedRoutes = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const userOnAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", req.url);
  if (!isAuthenticated && userOnProtectedRoutes) {
    return NextResponse.redirect(loginUrl);
  }
  if (isAuthenticated && userOnAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/auth).*)", "/api/trpc/(.*)"],
};
