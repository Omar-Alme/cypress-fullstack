"use client";

import { moodEmoji, UI_RATING_TO_MOOD, MoodKey } from "@/lib/mood";

export function MoodLegend() {
    const ratings = [1, 2, 3, 4, 5] as const;

    return (
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            {ratings.map((n) => {
                const mood = UI_RATING_TO_MOOD[n] as MoodKey;
                return (
                    <div key={n} className="flex items-center gap-1">
                        <span aria-hidden>{moodEmoji[mood]}</span>
                        <span className="uppercase">{mood}</span>
                    </div>
                );
            })}
        </div>
    );
}
