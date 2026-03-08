import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        const session = await auth()

        // Check if the user is authenticated
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const {
            gender,
            musicalJourney,
            favoriteSinger,
            city,
            instagram,
            youtube,
            spotify,
            voiceSampleUrl,
            username,
        } = await request.json()

        // Ensure they passed a username
        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 })
        }

        // Check if the username is already taken by someone else
        const existingUser = await prisma.user.findUnique({
            where: { username },
        })

        if (existingUser && existingUser.id !== session.user.id) {
            return NextResponse.json({ error: "Username is already taken" }, { status: 400 })
        }

        // Update the user
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                gender,
                musicalJourney,
                favoriteSinger,
                city,
                instagram,
                youtube,
                spotify,
                voiceSampleUrl,
                username,
                onboardingCompleted: true,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error during onboarding:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
