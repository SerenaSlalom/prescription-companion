<script setup lang="ts">
defineProps<{
  days: { date: Date; taken: boolean; isToday: boolean }[];
}>();

function titleFor(day: { date: Date; taken: boolean; isToday: boolean }): string {
  const label = day.date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  if (day.isToday) return `${label} · today${day.taken ? ", taken" : ""}`;
  return `${label} · ${day.taken ? "taken" : "missed"}`;
}
</script>

<template>
  <div class="adherence-calendar">
    <div class="adherence-calendar__grid">
      <span
        v-for="day in days"
        :key="day.date.toISOString()"
        class="adherence-calendar__cell"
        :class="{
          'adherence-calendar__cell--taken': day.taken,
          'adherence-calendar__cell--today': day.isToday,
        }"
        :title="titleFor(day)"
      />
    </div>
    <div class="adherence-calendar__legend body-sm">
      <span class="adherence-calendar__legend-item">
        <span class="adherence-calendar__swatch adherence-calendar__swatch--taken" />
        Taken
      </span>
      <span class="adherence-calendar__legend-item">
        <span class="adherence-calendar__swatch" />
        Missed
      </span>
      <span class="adherence-calendar__legend-item">
        <span class="adherence-calendar__swatch adherence-calendar__swatch--today" />
        Today
      </span>
    </div>
  </div>
</template>

<style scoped>
.adherence-calendar__grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;
}

.adherence-calendar__cell {
  aspect-ratio: 1;
  border-radius: var(--radius-full);
  background-color: transparent;
  border: 1px solid rgba(20, 20, 18, 0.28);
}

.adherence-calendar__cell--taken {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.adherence-calendar__cell--today {
  border-style: dashed;
  border-color: var(--color-primary);
}

.adherence-calendar__cell--today.adherence-calendar__cell--taken {
  box-shadow: 0 0 0 2px var(--color-surface), 0 0 0 3px var(--color-primary);
  border-style: solid;
}

.adherence-calendar__legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-md);
  color: var(--color-primary);
}

.adherence-calendar__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.adherence-calendar__swatch {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(20, 20, 18, 0.28);
  flex: none;
}

.adherence-calendar__swatch--taken {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.adherence-calendar__swatch--today {
  border-style: dashed;
  border-color: var(--color-primary);
}
</style>
