"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingSelector } from "@/components/home/rating-selector";
import { MoodPreview } from "@/components/home/mood-preview";
import { ReflectionTextarea } from "@/components/home/reflection-textarea";
import { FormError } from "@/components/home/form-error";
import { Actions } from "@/components/home/actions";
import { UI_RATING_TO_MOOD, MoodKey } from "@/lib/mood";
import { MoodLegend } from "@/components/home/mood-legend";

export default function Home() {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedMoodKey = useMemo<MoodKey | null>(
    () => (rating ? UI_RATING_TO_MOOD[rating as 1|2|3|4|5] : null),
    [rating]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!rating) return setError("Please choose a rating (1–5).");
    if (text.trim().length < 10) return setError("Reflection is too short (min 10 characters).");

    setLoading(true);
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.error ?? "Something went wrong, please try again.");
        setLoading(false);
        return;
      }

      // Simple redirect (we removed the ai=down banner flow)
      router.push("/history");
    } catch {
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  }

  function reset() {
    setRating(null);
    setText("");
    setError(null);
  }

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
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <RatingSelector value={rating} onChangeAction={setRating} />
                <MoodPreview moodKey={selectedMoodKey} />
              </div>

              <div className="space-y-2">
                <ReflectionTextarea value={text} onChangeAction={setText} />
              </div>

              <FormError message={error} />
              <Actions submitting={loading} onClearAction={reset} />

              <MoodLegend />
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
