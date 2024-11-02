import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/contacts/:path*", "/api/:path*"],
};

export default withMiddlewareAuthRequired({
  returnTo(req) {
    return `${req.nextUrl.basePath}${req.nextUrl.pathname}`;
  },
  async middleware(request: NextRequest) {
    try {
      const res = NextResponse.next();
      return res;
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  },
});
