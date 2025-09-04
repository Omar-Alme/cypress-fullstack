import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { openai } from "@/lib/openai";
import { Mood } from "@/generated/prisma";

function isValidRating(n: unknown): n is number {
    return typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= 5;
}

async function getInsights(rating: number, text: string) {
    if (!process.env.OPENAI_API_KEY || process.env.NODE_ENV === "test") {
        return {
            aiSummary: "You seemed reflective but balanced.",
            aiMood: Mood.CALM,
            aiTip: "Plan a 15-minute walk.",
        };
    }

    try {
        const systemPrompt = `
You are a journaling assistant. Output strict JSON:
{
  "aiSummary": "1–2 sentences",
  "aiMood": one of [HAPPY, CALM, NEUTRAL, STRESSED, ANXIOUS, SAD],
  "aiTip": "concise actionable tip"
}`;
        const resp = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
            temperature: 0.3,
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: `Rating: ${rating}\nText: """${text}"""`,
                },
            ],
        });
        const content = resp.choices?.[0]?.message?.content ?? "";
        const json = content.startsWith("{") ? JSON.parse(content) : JSON.parse(content.substring(content.indexOf("{")));
        return {
            aiSummary: json.aiSummary || null,
            aiMood: Mood[json.aiMood as keyof typeof Mood] || null,
            aiTip: json.aiTip || null,
        };
    } catch {
        return null;
    }
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const rating = body.rating as number;
    const text = (body.text as string | undefined)?.trim() || "";

    if (!isValidRating(rating)) return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    if (text.length < 10) return NextResponse.json({ error: "Reflection is too short" }, { status: 400 });

    const testNoAI = req.headers.get("x-test-no-ai") === "1";

    const insights = testNoAI ? null : await getInsights(rating, text);

    const entry = await db.entry.create({
        data: {
            rating,
            text,
            aiSummary: insights?.aiSummary,
            aiMood: insights?.aiMood,
            aiTip: insights?.aiTip,
        },
    });

    return NextResponse.json(entry, { status: 201 });
}
