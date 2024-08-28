import { getToken } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log("from line 9 middleware", token);
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname === "/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname === "/verify" ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/create-user", request.url));
  } else if (!token && url.pathname === "/create-user") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/create-user"],
};
