import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      !request.nextauth.token &&
      request.nextUrl.pathname.startsWith("/addpostform") 
    ) {
      return NextResponse.rewrite(new URL("/deniedForNotLogin", request.url));
    }
    if (
      request.nextauth.token?.role !== 5150 && 
      request.nextUrl.pathname.startsWith("/admin") 
    ) {
      return NextResponse.rewrite(new URL("/deniedForNotAdmin", request.url));
    }
  },
  {
    callbacks: {
      // デフォルトで認証チェックをtrueにする
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/admin", "/addpostform", "/userslist"],
};
// https://chatgpt.com/share/67292897-15d8-8007-8c8c-fd2d4375a1a9

// request object
// {
//   "nextUrl": {
//     "pathname": "/extra",
//     "search": "",
//     "origin": "https://example.com"
//   },
//   "nextauth": {
//     "token": {
//       "role": "manager",
//       "name": "User Name",
//       "email": "user@example.com",
//       "iat": 1234567890,
//       "exp": 1234567890
//     }
//   },
//   "method": "GET",
//   "headers": {
//     "authorization": "Bearer <token>",
//     "host": "example.com",
//     "user-agent": "Mozilla/5.0..."
//   },
//   "cookies": {}
// }

// NextResponse
// In Next.js middleware, the response object isn’t passed directly as an argument. Instead, you create responses or modify existing ones using the NextResponse object, which provides utility methods for generating responses. Here’s an overview of what NextResponse offers in this context:
// You can create a completely new response with custom status, headers, and body content.
// return NextResponse.json({ message: "Access Denied" }, { status: 403 });

// Redirecting:
// You can use NextResponse.redirect to redirect users to another URL.
// return NextResponse.redirect(new URL("/login", request.url));

// Rewriting:
// You can use NextResponse.rewrite to rewrite the URL path internally without changing the URL in the browser.
// return NextResponse.rewrite(new URL("/denied", request.url));
// Setting Cookies:

// NextResponse allows you to set cookies on the response.
// const response = NextResponse.next();
// response.cookies.set("authToken", "newTokenValue", { path: "/" });
// return response;

// Modifying Headers:
// You can modify headers in the response before sending it.
// const response = NextResponse.next();
// response.headers.set("X-Custom-Header", "CustomValue");
// return response;
