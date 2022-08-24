import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCorrectUrl } from "./libs/utils";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const domain = request.nextUrl.host;
  if (pathname.startsWith("/go")) {
    const parts = pathname.split("/");
    const slug = parts[parts.length - 1];

    console.log(getCorrectUrl(`${domain}/api/getUrl/${slug}`));

    const response = await fetch(getCorrectUrl(`${domain}/api/getUrl/${slug}`));

    if (response.ok) {
      const json = await response.json();
      return NextResponse.redirect(json.url);
    } else {
      return NextResponse.redirect(request.nextUrl.origin);
    }
  }
}
