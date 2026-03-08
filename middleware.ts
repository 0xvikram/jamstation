export { auth as middleware } from "@/auth"

export const config = {
  // Protect all /dashboard routes; everything else is public
  // We will also use authorized callback in auth.ts to handle redirects for onboarding,
  // but to handle paths via Next.js middleware matchers:
  matcher: ["/dashboard/:path*", "/onboarding"],
}
