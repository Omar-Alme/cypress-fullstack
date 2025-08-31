import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { Mood } from "@/generated/prisma";

function isValidRating(n: unknown): n is number {
    return typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= 5;
}

async function generateInsights(rating: number, text: string) {
    if (process.env.NODE_ENV === "test") {
        return {
            aiSummary: "You seemed reflective but balanced.",
            aiMood: Mood.CALM,
            aiTip: "Plan a 15-minute walk.",
        };
    }

    const t = text.toLowerCase();
    const aiMood =
        rating === 5 ? Mood.HAPPY :
            rating === 4 ? Mood.CALM :
                rating === 3 ? Mood.NEUTRAL :
                    t.includes("anxious") ? Mood.ANXIOUS :
                        t.includes("stress") ? Mood.STRESSED :
                            Mood.SAD;

    return {
        aiSummary: "Thanks for reflecting today.",
        aiMood,
        aiTip: "Write one specific goal for tomorrow.",
    };
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const rating = body?.rating as number;
    const text = (body?.text as string | undefined)?.trim() ?? "";

    if (!isValidRating(rating)) {
        return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }
    if (text.length < 10) {
        return NextResponse.json({ error: "Reflection is too short" }, { status: 400 });
    }

    try {
        const { aiSummary, aiMood, aiTip } = await generateInsights(rating, text);
        const entry = await db.entry.create({
            data: { rating, text, aiSummary, aiMood, aiTip },
        });
        return NextResponse.json(entry, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET() {
    const entries = await db.entry.findMany({
        orderBy: { createdAt: "desc" },
        take: 30,
    });
    return NextResponse.json(entries);
}
