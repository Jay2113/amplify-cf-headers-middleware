import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The country to restrict from caching
const RESTRICTED_COUNTRY = "US";

// Trigger this middleware to run on the `/` route
export const config = {
  matcher: "/",
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  console.log(requestHeaders);

  // Extract country
  const country = request.headers.get("cloudfront-viewer-country");

  console.log(`Visitor from ${country}`);

  // Specify the correct route based on the requests location
  if (country === RESTRICTED_COUNTRY) {
    requestHeaders.set("Cache-Control", "no-cache");
    return NextResponse.rewrite(new URL("/restrict", request.url));
  }
}

// middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// const RESTRICTED_COUNTRIES = ["IN", "US"];

// export async function middleware(request: NextRequest) {
//   const requestHeaders = new Headers(request.headers);

//   console.log(requestHeaders);

//   const country = request.headers.get("cloudfront-viewer-country") || "";

//   console.log(country);

//   if (RESTRICTED_COUNTRIES.includes(country)) {
//     requestHeaders.set("Cache-Control", "no-cache");
//     return NextResponse.rewrite(new URL("/restrict", request.url));
//   }
// }
