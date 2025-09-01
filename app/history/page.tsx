import { db } from "@/lib/prisma";
import { Mood } from "@/generated/prisma";

type MoodKey = keyof typeof Mood;
const moodEmoji: Record<MoodKey, string> = {
    HAPPY: "😄",
    CALM: "🙂",
    NEUTRAL: "😐",
    STRESSED: "😟",
    ANXIOUS: "😰",
    SAD: "😢",
};

export default async function HistoryPage() {

    const entries = await db.entry.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
    });

    return (
        <main className="mx-auto max-w-2xl p-6 space-y-6">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">History</h1>
                <p className="text-sm text-muted-foreground">
                    Your recent reflections with AI insights.
                </p>
            </header>

            {!entries.length && (
                <p className="text-sm text-muted-foreground">No reflections yet.</p>
            )}

            <section className="space-y-4">
                {entries.map((e) => {
                    const created =
                        e.createdAt instanceof Date
                            ? e.createdAt
                            : new Date(e.createdAt as unknown as string);

                    return (
                        <article
                            key={e.id}
                            data-testid="entry-card"
                            className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm"
                        >
                            <div className="mb-2 flex items-center justify-between gap-2">
                                <time
                                    className="text-xs text-muted-foreground"
                                    dateTime={created.toISOString()}
                                >
                                    {created.toLocaleString()}
                                </time>

                                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
                                    Rating&nbsp;{e.rating}/5
                                </span>
                            </div>

                            <p className="mb-3 whitespace-pre-wrap leading-relaxed">
                                {e.text}
                            </p>

                            <div className="grid gap-1 text-sm">
                                {e.aiSummary && (
                                    <p>
                                        <span className="font-medium">Summary:</span>{" "}
                                        <span className="text-muted-foreground">{e.aiSummary}</span>
                                    </p>
                                )}

                                {e.aiMood && (
                                    <p className="flex items-center gap-2">
                                        <span className="font-medium">Mood:</span>
                                        <span aria-hidden>
                                            {moodEmoji[e.aiMood as MoodKey]}
                                        </span>
                                        <span className="uppercase">{e.aiMood}</span>
                                    </p>
                                )}

                                {e.aiTip && (
                                    <p>
                                        <span className="font-medium">Tip:</span>{" "}
                                        <span className="text-muted-foreground">{e.aiTip}</span>
                                    </p>
                                )}
                            </div>
                        </article>
                    );
                })}
            </section>
        </main>
    );
}
