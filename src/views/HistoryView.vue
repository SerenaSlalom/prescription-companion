<script setup lang="ts">
import { computed } from "vue";
import { useAppState } from "../composables/useAppState";
import { formatDayHeading, formatTime } from "../utils/format";
import TopBar from "../components/TopBar.vue";
import FeelingBadge from "../components/FeelingBadge.vue";

const { allLogsSorted, getMedication } = useAppState();

const groups = computed(() => {
  const map = new Map<string, typeof allLogsSorted.value>();
  for (const entry of allLogsSorted.value) {
    const heading = formatDayHeading(entry.takenAt);
    if (!map.has(heading)) map.set(heading, []);
    map.get(heading)!.push(entry);
  }
  return Array.from(map.entries()).map(([heading, entries]) => ({ heading, entries }));
});

const feelingCounts = computed(() => {
  const counts = { fine: 0, mild_side_effect: 0, not_working: 0, something_off: 0 };
  for (const entry of allLogsSorted.value) counts[entry.feeling] += 1;
  return counts;
});
</script>

<template>
  <div class="screen">
    <TopBar title="History" />

    <h1 class="display-lg history__headline">Your <span class="emphasis">timeline</span>.</h1>
    <p class="body-md text-muted">Every dose and check-in you've logged, most recent first.</p>

    <section class="history__trend">
      <div class="spectrum-band history__band">
        <p class="label">This history at a glance</p>
        <div class="history__trend-row">
          <div class="history__trend-item">
            <p class="headline-md">{{ feelingCounts.fine }}</p>
            <p class="body-sm">Fine</p>
          </div>
          <div class="history__trend-item">
            <p class="headline-md">{{ feelingCounts.mild_side_effect }}</p>
            <p class="body-sm">Mild side effect</p>
          </div>
          <div class="history__trend-item">
            <p class="headline-md">{{ feelingCounts.not_working }}</p>
            <p class="body-sm">Not working</p>
          </div>
          <div class="history__trend-item">
            <p class="headline-md">{{ feelingCounts.something_off }}</p>
            <p class="body-sm">Something off</p>
          </div>
        </div>
      </div>
    </section>

    <div v-for="group in groups" :key="group.heading" class="history__group">
      <p class="label-sm text-muted history__day">{{ group.heading }}</p>
      <div class="stack-sm">
        <article v-for="entry in group.entries" :key="entry.id" class="card history__entry">
          <div class="cluster-between">
            <div>
              <p class="body-md history__entry-name">{{ getMedication(entry.medicationId)?.name }}</p>
              <p class="body-sm text-muted">{{ formatTime(entry.takenAt) }}</p>
            </div>
            <FeelingBadge :feeling="entry.feeling" />
          </div>
          <p v-if="entry.note" class="body-sm history__entry-note">{{ entry.note }}</p>
        </article>
      </div>
    </div>

    <p v-if="!groups.length" class="card body-md text-muted">
      No entries yet — once you mark a dose as taken, it'll show up here.
    </p>
  </div>
</template>

<style scoped>
.history__headline {
  margin-top: var(--space-sm);
}

.history__trend {
  margin: var(--space-lg) 0 var(--space-xl);
}

.history__trend-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.history__trend-item {
  text-align: center;
}

.history__trend-item .body-sm {
  color: var(--color-secondary);
}

.history__group {
  margin-bottom: var(--space-lg);
}

.history__day {
  margin-bottom: var(--space-sm);
  padding-left: 2px;
}

.history__entry-name {
  font-weight: 500;
}

.history__entry-note {
  margin: var(--space-sm) 0 0;
  color: var(--color-secondary);
}
</style>
