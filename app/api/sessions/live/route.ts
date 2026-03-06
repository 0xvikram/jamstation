import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/sessions/live — discovery page fetches all currently active jams
export async function GET() {
  const sessions = await prisma.session.findMany({
    where: { status: "LIVE" },
    include: {
      host: {
        select: { id: true, name: true, username: true, avatarUrl: true },
      },
      _count: {
        select: {
          requests: { where: { status: "APPROVED" } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(sessions)
}
