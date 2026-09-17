import type { Feeling, LogEntry } from "../types";

const PRIMARY_MEDICATION_ID = "serenolex";
const HISTORY_DAYS = 30;

// Days ago (from today) where a dose was missed entirely.
// Today itself is always left unlogged so "mark as taken" has something to do.
const SKIPPED_DAYS = new Set([10, 19, 25]);

// Specific days worth a richer check-in than the "fine" default —
// this is where Jordan's refill-appearance story lives.
const NOTABLE_DAYS: Partial<Record<number, { feeling: Feeling; note?: string }>> = {
  11: { feeling: "mild_side_effect", note: "A little groggy after breakfast, otherwise fine." },
  7: { feeling: "mild_side_effect", note: "Slight headache in the afternoon." },
  4: {
    feeling: "something_off",
    note: "Refill came in looking different — round and white instead of the blue oval. Same dose, but unsettling.",
  },
  17: { feeling: "mild_side_effect", note: "Felt a bit off after dinner." },
};

function atTime(daysAgo: number, hour: number, minute: number, minuteOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute + minuteOffset, 0, 0);
  return date.toISOString();
}

export function generateSeedLogs(): LogEntry[] {
  const entries: LogEntry[] = [];

  for (let daysAgo = HISTORY_DAYS - 1; daysAgo >= 1; daysAgo -= 1) {
    if (SKIPPED_DAYS.has(daysAgo)) continue;

    const notable = NOTABLE_DAYS[daysAgo];
    // Deterministic small jitter so times aren't perfectly on the hour, without randomness.
    const minuteOffset = ((daysAgo * 7) % 21) - 10;

    entries.push({
      id: `seed-${daysAgo}`,
      medicationId: PRIMARY_MEDICATION_ID,
      takenAt: atTime(daysAgo, 8, 5, minuteOffset),
      feeling: notable?.feeling ?? "fine",
      note: notable?.note,
    });
  }

  return entries;
}
