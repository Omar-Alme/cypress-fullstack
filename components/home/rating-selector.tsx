"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RatingSelector({
    value,
    onChangeAction,
}: {
    value: number | null;
    onChangeAction: (n: 1 | 2 | 3 | 4 | 5) => void;
}) {
    return (
        <div
            role="group"
            aria-label="Choose rating 1 to 5"
            className="flex flex-wrap items-center justify-center gap-2"
        >
            {[1, 2, 3, 4, 5].map((n) => (
                <Button
                    key={n}
                    type="button"
                    data-testid={`rating-${n}`}
                    aria-pressed={value === n}
                    aria-label={`Rating ${n}`}
                    onClick={() => onChangeAction(n as 1 | 2 | 3 | 4 | 5)}
                    variant={value === n ? "default" : "outline"}
                    className={cn(
                        "h-12 w-12 rounded-full p-0 text-base font-semibold",
                        "transition-all duration-150 cursor-pointer",
                        value === n ? "shadow-sm" : "hover:scale-[1.03]"
                    )}
                    title={`Rating ${n}`}
                >
                    {n}
                </Button>
            ))}
        </div>
    );
}
