import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// PATCH /api/requests/:id — host approves or rejects a singer
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const userId = (session?.user as any)?.id as string | undefined

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: requestId } = await params
  const body = await req.json()
  const { status } = body

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json(
      { error: 'status must be "APPROVED" or "REJECTED"' },
      { status: 400 }
    )
  }

  const stageRequest = await prisma.stageRequest.findUnique({
    where: { id: requestId },
    include: { session: true },
  })

  if (!stageRequest) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 })
  }

  // Only the session's host can approve or reject
  if (stageRequest.session.hostId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const updated = await prisma.stageRequest.update({
    where: { id: requestId },
    data: { status },
    include: {
      user: { select: { id: true, name: true, username: true, avatarUrl: true } },
    },
  })

  return NextResponse.json(updated)
}
