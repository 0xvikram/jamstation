import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// POST /api/sessions — host creates a new jam session
export async function POST(req: NextRequest) {
  const session = await auth()
  const userId = (session?.user as any)?.id as string | undefined

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { title, description, startTime, entryFee } = body

  if (!title || !startTime) {
    return NextResponse.json(
      { error: "title and startTime are required" },
      { status: 400 }
    )
  }

  const newSession = await prisma.session.create({
    data: {
      title: String(title),
      description: description ? String(description) : null,
      startTime: new Date(startTime),
      entryFee: Number(entryFee ?? 0),
      status: "UPCOMING",
      hostId: userId,
    },
    include: {
      host: {
        select: { id: true, name: true, username: true, avatarUrl: true },
      },
    },
  })

  return NextResponse.json(newSession, { status: 201 })
}
