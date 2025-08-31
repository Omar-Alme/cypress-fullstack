import { Prisma, Mood} from "@/generated/prisma";
import { db } from "../db";

export async function seedEntries() {
    const mockedEntries: Prisma.EntryUncheckedCreateInput[] = [
        {
            id: "66e0aa000000000000000001",
            rating: 4,
            text: "Today was a good day, I went for a long walk and finished my school project.",
            aiSummary: "A productive day with positive feelings.",
            aiMood: Mood.CALM,
            aiTip: "Plan a 15-minute walk tomorrow too."
        },
        {
            id: "66e0aa000000000000000002",
            rating: 2,
            text: "Stressful day at work but I handled it and took short breaks.",
            aiSummary: "Stress was present but managed with breaks.",
            aiMood: Mood.STRESSED,
            aiTip: "Schedule micro-breaks every hour."
        },
        {
            id: "66e0aa000000000000000003",
            rating: 5,
            text: "Felt really happy after meeting friends and completing my tasks.",
            aiSummary: "High energy and social fulfillment.",
            aiMood: Mood.HAPPY,
            aiTip: "Keep a short social check-in midweek."
        },
        // To simulate ai failure
        // {
        //     id: "66e0aa000000000000000004",
        //     rating: 3,
        //     text: "Average day, some progress, some fatigue."
        //     // aiSummary/aiMood/aiTip intentionally omitted
        // }
    ];

    for (const { id, ...data } of mockedEntries) {
        await db.entry.upsert({
            where: { id },
            update: data,
            create: { id, ...data },
        });
    }
}
