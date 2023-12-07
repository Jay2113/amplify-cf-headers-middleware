import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// The country to restrict from caching
const RESTRICTED_COUNTRY = "US";

// Trigger this middleware to run on the `/` route
export const config = {
  matcher: "/",
};

export function middleware(request: NextRequest, response: NextResponse) {
  const requestHeaders = new Headers(request.headers);

  console.log(requestHeaders);

  requestHeaders.set("Cache-Control", "no-store");

  // Extract country
  const country = request.headers.get("cloudfront-viewer-country");

  console.log(`Visitor from ${country}`);

  // Specify the correct route based on the requests location
  if (country === RESTRICTED_COUNTRY) {
    return NextResponse.rewrite(new URL("/restrict", request.url), {
      request: {
        headers: requestHeaders,
      },
    });
  }
  response.headers.set("Cache-Control", "no-store");
  console.log(response.headers);
}
