import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

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
      // user is only defined on initial sign-in
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, username: true },
        })
        if (dbUser) {
          token.dbId = dbUser.id
          token.username = dbUser.username
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
      return session
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      }
      return true
    },
  },
})
