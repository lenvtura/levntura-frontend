import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const response = await fetch("https://ipinfo.io/json");
  const data = await response.json();
  const country = data.country;

  // You can set the IP in a new header to be accessed in Server Components/API routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("user-country", country);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
