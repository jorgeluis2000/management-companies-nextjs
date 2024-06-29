import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get("session-cookie");
    if (req.nextUrl.pathname.startsWith("/admin") && !sessionCookie) {
        return NextResponse.redirect("/dashboard")
    }
    if (req.nextUrl.pathname.startsWith("/admin") && sessionCookie) {
        return NextResponse.redirect("/dashboard")
    }
}