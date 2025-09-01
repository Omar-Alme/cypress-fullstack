import { Mood } from "@/generated/prisma";

export type MoodKey = keyof typeof Mood;

export const moodEmoji: Record<MoodKey, string> = {
    HAPPY: "😄",
    CALM: "🙂",
    NEUTRAL: "😐",
    STRESSED: "😟",
    ANXIOUS: "😰",
    SAD: "😢",
};
