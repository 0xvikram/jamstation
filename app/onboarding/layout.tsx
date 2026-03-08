import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/");
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { onboardingCompleted: true }
    });

    if (dbUser?.onboardingCompleted) {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
