import { computed, reactive, ref, watch } from "vue";
import medicationsData from "../data/medications.json";
import { generateSeedLogs } from "../data/seedLogs";
import type { Feeling, LogEntry, Medication } from "../types";

const LOGS_KEY = "calla.logs.v1";
const ONBOARDED_KEY = "calla.onboarded.v1";
const TEXT_LARGE_KEY = "calla.textLarge.v1";

const medications = reactive<Medication[]>(medicationsData as Medication[]);

function loadLogs(): LogEntry[] {
  try {
    const raw = localStorage.getItem(LOGS_KEY);
    if (raw) return JSON.parse(raw) as LogEntry[];
  } catch {
    // fall through to seed data
  }
  return generateSeedLogs();
}

const logs = reactive<LogEntry[]>(loadLogs());
const onboarded = ref(localStorage.getItem(ONBOARDED_KEY) === "true");
const textLarge = ref(localStorage.getItem(TEXT_LARGE_KEY) === "true");

watch(
  logs,
  (value) => {
    localStorage.setItem(LOGS_KEY, JSON.stringify(value));
  },
  { deep: true }
);

watch(textLarge, (value) => {
  localStorage.setItem(TEXT_LARGE_KEY, String(value));
  document.documentElement.classList.toggle("text-large", value);
});
document.documentElement.classList.toggle("text-large", textLarge.value);

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function useAppState() {
  const activeMedications = computed(() => medications.filter((m) => m.activeRegimen));

  const allLogsSorted = computed(() =>
    [...logs].sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime())
  );

  function getMedication(id: string): Medication | undefined {
    return medications.find((m) => m.id === id);
  }

  function logsForMedication(id: string): LogEntry[] {
    return allLogsSorted.value.filter((l) => l.medicationId === id);
  }

  function todaysLogEntry(medicationId: string): LogEntry | undefined {
    const today = new Date();
    return logs.find((l) => l.medicationId === medicationId && isSameDay(new Date(l.takenAt), today));
  }

  function isTakenToday(medicationId: string): boolean {
    return Boolean(todaysLogEntry(medicationId));
  }

  function hasLogOnDay(medicationId: string, day: Date): boolean {
    return logs.some((l) => l.medicationId === medicationId && isSameDay(new Date(l.takenAt), day));
  }

  function streakFor(medicationId: string): number {
    let count = 0;
    let cursor = startOfDay(new Date());
    if (!isTakenToday(medicationId)) {
      cursor = addDays(cursor, -1);
    }
    while (hasLogOnDay(medicationId, cursor)) {
      count += 1;
      cursor = addDays(cursor, -1);
    }
    return count;
  }

  function adherenceCalendar(medicationId: string, days: number): { date: Date; taken: boolean; isToday: boolean }[] {
    const today = startOfDay(new Date());
    const result: { date: Date; taken: boolean; isToday: boolean }[] = [];
    for (let offset = days - 1; offset >= 0; offset -= 1) {
      const date = addDays(today, -offset);
      result.push({ date, taken: hasLogOnDay(medicationId, date), isToday: offset === 0 });
    }
    return result;
  }

  function isOverdue(medication: Medication): boolean {
    if (medication.scheduleTimes.length === 0) return false;
    if (isTakenToday(medication.id)) return false;
    const [hours, minutes] = medication.scheduleTimes[0].split(":").map(Number);
    const scheduled = new Date();
    scheduled.setHours(hours, minutes, 0, 0);
    const graceMs = 90 * 60 * 1000;
    return Date.now() > scheduled.getTime() + graceMs;
  }

  function recordDose(medicationId: string, feeling: Feeling, note?: string) {
    logs.push({
      id: `log-${Date.now()}`,
      medicationId,
      takenAt: new Date().toISOString(),
      feeling,
      note: note?.trim() ? note.trim() : undefined,
    });
  }

  function completeOnboarding() {
    onboarded.value = true;
    localStorage.setItem(ONBOARDED_KEY, "true");
  }

  function toggleTextSize() {
    textLarge.value = !textLarge.value;
  }

  return {
    medications,
    activeMedications,
    allLogsSorted,
    onboarded,
    textLarge,
    getMedication,
    logsForMedication,
    todaysLogEntry,
    isTakenToday,
    streakFor,
    adherenceCalendar,
    isOverdue,
    recordDose,
    completeOnboarding,
    toggleTextSize,
  };
}
