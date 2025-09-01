import { Mood } from "@/generated/prisma";
import { moodEmoji, MoodKey } from "@/lib/mood";

type EntryCardProps = {
    entry: {
        id: string;
        rating: number;
        text: string;
        aiSummary?: string | null;
        aiMood?: Mood | null;
        aiTip?: string | null;
        createdAt: Date | string;
    };
};

export function EntryCard({ entry }: EntryCardProps) {
    const created =
        entry.createdAt instanceof Date
            ? entry.createdAt
            : new Date(entry.createdAt as string);

    return (
        <article
            key={entry.id}
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
                    Rating&nbsp;{entry.rating}/5
                </span>
            </div>

            <p className="mb-3 whitespace-pre-wrap leading-relaxed">{entry.text}</p>

            <div className="grid gap-1 text-sm">
                {entry.aiSummary && (
                    <p>
                        <span className="font-medium">Summary:</span>{" "}
                        <span className="text-muted-foreground">{entry.aiSummary}</span>
                    </p>
                )}

                {entry.aiMood && (
                    <p className="flex items-center gap-2">
                        <span className="font-medium">Mood:</span>
                        <span aria-hidden>{moodEmoji[entry.aiMood as MoodKey]}</span>
                        <span className="uppercase">{entry.aiMood}</span>
                    </p>
                )}

                {entry.aiTip && (
                    <p>
                        <span className="font-medium">Tip:</span>{" "}
                        <span className="text-muted-foreground">{entry.aiTip}</span>
                    </p>
                )}
            </div>
        </article>
    );
}
