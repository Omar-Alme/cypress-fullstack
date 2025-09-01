import { EntryCard } from "./entry-card";
import { Mood } from "@/generated/prisma";

type EntryItem = {
    id: string;
    rating: number;
    text: string;
    aiSummary?: string | null;
    aiMood?: Mood | null;
    aiTip?: string | null;
    createdAt: Date | string;
};

export function EntriesList({ entries }: { entries: EntryItem[] }) {
    if (!entries.length) {
        return (
            <p className="text-sm text-muted-foreground">
                No reflections yet.
            </p>
        );
    }

    return (
        <section className="space-y-4">
            {entries.map((e) => (
                <EntryCard key={e.id} entry={e} />
            ))}
        </section>
    );
}
