import type { Feeling, LogEntry } from "../types";

interface SeedEntry {
  daysAgo: number;
  feeling: Feeling;
  note?: string;
  minuteOffset?: number;
}

const PRIMARY_MEDICATION_ID = "serenolex";

// Two weeks of history for Jordan's daily maintenance medication,
// ending yesterday (today is always left unlogged on a fresh load
// so the "mark as taken" flow has something to do).
const SEED: SeedEntry[] = [
  { daysAgo: 13, feeling: "fine" },
  { daysAgo: 12, feeling: "fine", minuteOffset: 12 },
  { daysAgo: 11, feeling: "mild_side_effect", note: "A little groggy after breakfast, otherwise fine.", minuteOffset: -5 },
  // daysAgo 10 intentionally skipped — an off day in the streak.
  { daysAgo: 9, feeling: "fine" },
  { daysAgo: 8, feeling: "fine", minuteOffset: 18 },
  { daysAgo: 7, feeling: "mild_side_effect", note: "Slight headache in the afternoon.", minuteOffset: 25 },
  { daysAgo: 6, feeling: "fine" },
  { daysAgo: 5, feeling: "fine", minuteOffset: -8 },
  {
    daysAgo: 4,
    feeling: "something_off",
    note: "Refill came in looking different — round and white instead of the blue oval. Same dose, but unsettling.",
    minuteOffset: 6,
  },
  { daysAgo: 3, feeling: "fine" },
  { daysAgo: 2, feeling: "fine", minuteOffset: 10 },
  { daysAgo: 1, feeling: "fine", minuteOffset: -3 },
];

function atTime(daysAgo: number, hour: number, minute: number, minuteOffset = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute + minuteOffset, 0, 0);
  return date.toISOString();
}

export function generateSeedLogs(): LogEntry[] {
  return SEED.map((entry, index) => ({
    id: `seed-${index}`,
    medicationId: PRIMARY_MEDICATION_ID,
    takenAt: atTime(entry.daysAgo, 8, 5, entry.minuteOffset),
    feeling: entry.feeling,
    note: entry.note,
  }));
}
