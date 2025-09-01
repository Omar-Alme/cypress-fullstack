"use client";

import { Badge } from "@/components/ui/badge";
import { moodEmoji, MoodKey } from "@/lib/mood";

export function MoodPreview({
    moodKey,
}: {
    moodKey: MoodKey | null;
}) {
    return (
        <div className="flex items-center justify-center gap-2 pt-1">
            {moodKey ? (
                <>
                    <span className="text-lg" aria-hidden>
                        {moodEmoji[moodKey]}
                    </span>
                    <Badge variant="secondary" className="uppercase">
                        {moodKey}
                    </Badge>
                </>
            ) : (
                <span className="text-xs text-muted-foreground">
                    Select a rating to see mood
                </span>
            )}
        </div>
    );
}
