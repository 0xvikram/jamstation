export { auth as middleware } from "@/auth"

export const config = {
  // Protect all /dashboard routes; everything else is public
  matcher: ["/dashboard/:path*"],
}
