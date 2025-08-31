"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Mood = {
  HAPPY: "😄",
  CALM: "🙂",
  NEUTRAL: "😐",
  STRESSED: "😟",
  ANXIOUS: "😰",
  SAD: "😢",
} as const;
type MoodKey = keyof typeof Mood;

const ratingToMood: Record<1 | 2 | 3 | 4 | 5, MoodKey> = {
  1: "SAD",
  2: "STRESSED",
  3: "NEUTRAL",
  4: "CALM",
  5: "HAPPY",
};

export default function Home() {
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedMoodKey = useMemo<MoodKey | null>(
    () => (rating ? ratingToMood[rating as 1 | 2 | 3 | 4 | 5] : null),
    [rating]
  );



  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
      <main className="mx-auto grid min-h-[80vh] max-w-3xl place-items-center px-4 py-10">
        <Card className="w-full rounded-2xl shadow-sm bg-card text-card-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Daily Reflection
            </CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              Capture your day. Get a quick summary, mood, and a tip.
            </p>
          </CardHeader>

          <CardContent>
            <form  className="space-y-6">
              {/* Rating buttons */}
              <div className="space-y-2">
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
                      aria-pressed={rating === n}
                      aria-label={`Rating ${n}`}
                      onClick={() => setRating(n)}
                      variant={rating === n ? "default" : "outline"}
                      className={cn(
                        "h-12 w-12 rounded-full p-0 text-base font-semibold",
                        "transition-all duration-150",
                        rating === n ? "shadow-sm" : "hover:scale-[1.03]"
                      )}
                      title={`Rating ${n}`}
                    >
                      {n}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  {selectedMoodKey ? (
                    <>
                      <span className="text-lg" aria-hidden>
                        {Mood[selectedMoodKey]}
                      </span>
                      <Badge variant="secondary" className="uppercase">
                        {selectedMoodKey}
                      </Badge>
                      <span className="text-xs text-muted-foreground">({rating}/5)</span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">Select a rating to see mood</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="rounded-2xl border bg-background p-2 shadow-sm">
                  <Textarea
                    id="text"
                    data-testid="text"
                    placeholder="Write your thoughts… (min 10 characters)"
                    aria-label="Write your reflection"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={7}
                    className={cn(
                      "min-h-[160px] resize-y border-0 focus-visible:ring-0",
                      "leading-relaxed bg-background text-foreground"
                    )}
                  />
                </div>
              </div>

              {error && (
                <div role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <Button type="submit" data-testid="submit" disabled={loading} className="px-6">
                  {loading ? "Saving…" : "Save reflection"}
                </Button>
                <Button type="button" variant="ghost"  className="px-4">
                  Clear
                </Button>
              </div>

              {/* Legend (emoji + enum only) */}
              <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                {(Object.keys(Mood) as MoodKey[]).map((k) => (
                  <div key={k} className="flex items-center gap-1">
                    <span aria-hidden>{Mood[k]}</span>
                    <span className="uppercase">{k}</span>
                  </div>
                ))}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
