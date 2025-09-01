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

export const UI_RATING_TO_MOOD: Record<1 | 2 | 3 | 4 | 5, MoodKey> = {
    1: "SAD",
    2: "STRESSED",
    3: "NEUTRAL",
    4: "CALM",
    5: "HAPPY",
};