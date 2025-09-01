import { db } from "@/lib/prisma";
import { EntriesList } from "@/components/history/entries-list";

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

            <EntriesList entries={entries} />
        </main>
    );
}
