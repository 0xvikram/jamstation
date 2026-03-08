import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username?: string
      onboardingCompleted?: boolean
    } & import("next-auth").DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      const baseUsername = user.email
        .split("@")[0]
        .replace(/[^a-zA-Z0-9_]/g, "_")
        .toLowerCase()

      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name ?? null,
          avatarUrl: user.image ?? null,
        },
        create: {
          email: user.email,
          username: `${baseUsername}_${Date.now()}`,
          name: user.name ?? null,
          avatarUrl: user.image ?? null,
        },
      })

      return true
    },

    async jwt({ token, user }) {
      // user is only defined on initial sign-in, but token.email always exists.
      // If we don't have dbId in the token yet (e.g. old session), fetch it!
      if (!token.dbId && (user?.email || token?.email)) {
        const emailToUse = user?.email || token?.email;
        if (emailToUse) {
          const dbUser = await prisma.user.findUnique({
            where: { email: emailToUse },
            select: { id: true, username: true, onboardingCompleted: true },
          })
          if (dbUser) {
            token.dbId = dbUser.id
            token.username = dbUser.username
            token.onboardingCompleted = dbUser.onboardingCompleted
          }
        }
      } else if (user?.email) {
        // Also update token on initial sign-in just in case
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, username: true, onboardingCompleted: true },
        })
        if (dbUser) {
          token.dbId = dbUser.id
          token.username = dbUser.username
          token.onboardingCompleted = dbUser.onboardingCompleted
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token.dbId) {
        // @ts-ignore – extend the default NextAuth session type
        session.user.id = token.dbId as string
      }
      if (token.username) {
        // @ts-ignore
        session.user.username = token.username as string
      }
      if (token.onboardingCompleted !== undefined) {
        // @ts-ignore
        session.user.onboardingCompleted = token.onboardingCompleted as boolean
      }
      return session
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnboarding = nextUrl.pathname.startsWith("/onboarding")

      if (isOnDashboard || isOnboarding) {
        return isLoggedIn;
      }

      return true
    },
  },
})
