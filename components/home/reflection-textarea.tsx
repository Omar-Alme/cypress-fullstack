"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function ReflectionTextarea({
    value,
    onChangeAction,
}: {
    value: string;
    onChangeAction: (v: string) => void;
}) {
    return (
        <div className="rounded-2xl border bg-background p-2 shadow-sm">
            <Textarea
                id="text"
                data-testid="text"
                placeholder="Write your thoughts… (min 10 characters)"
                aria-label="Write your reflection"
                value={value}
                onChange={(e) => onChangeAction(e.target.value)}
                rows={7}
                className={cn(
                    "min-h-[160px] resize-y border-0 focus-visible:ring-0",
                    "leading-relaxed bg-background text-foreground"
                )}
            />
        </div>
    );
}
