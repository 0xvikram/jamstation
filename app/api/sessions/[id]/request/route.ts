import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// POST /api/sessions/:id/request — audience member raises their hand
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const userId = (session?.user as any)?.id as string | undefined

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: sessionId } = await params

  const jamSession = await prisma.session.findUnique({
    where: { id: sessionId },
  })

  if (!jamSession) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  if (jamSession.status !== "LIVE") {
    return NextResponse.json(
      { error: "Session is not live" },
      { status: 400 }
    )
  }

  // Hosts cannot request to join their own session
  if (jamSession.hostId === userId) {
    return NextResponse.json(
      { error: "You are the host of this session" },
      { status: 400 }
    )
  }

  // Prevent duplicate pending requests
  const existing = await prisma.stageRequest.findFirst({
    where: { sessionId, userId, status: "PENDING" },
  })

  if (existing) {
    return NextResponse.json(
      { error: "You already have a pending request" },
      { status: 409 }
    )
  }

  const request = await prisma.stageRequest.create({
    data: { sessionId, userId, status: "PENDING" },
    include: {
      user: { select: { id: true, name: true, username: true, avatarUrl: true } },
    },
  })

  return NextResponse.json(request, { status: 201 })
}
