<script setup lang="ts">
import { computed } from "vue";
import { AlertCircle, Check, Eye } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAppState } from "../composables/useAppState";
import { formatFullDate, formatTime } from "../utils/format";
import TopBar from "../components/TopBar.vue";
import PillButton from "../components/PillButton.vue";
import IconButton from "../components/IconButton.vue";
import FeelingBadge from "../components/FeelingBadge.vue";
import AdherenceCalendar from "../components/AdherenceCalendar.vue";

const router = useRouter();
const { activeMedications, isTakenToday, todaysLogEntry, isOverdue, streakFor, adherenceCalendar } = useAppState();

const dateLabel = computed(() => formatFullDate(new Date()));

const anyOverdue = computed(() => activeMedications.value.some((med) => isOverdue(med)));
const allTaken = computed(
  () => activeMedications.value.length > 0 && activeMedications.value.every((med) => isTakenToday(med.id))
);

const primaryStreak = computed(() => {
  const first = activeMedications.value[0];
  return first ? streakFor(first.id) : 0;
});

const primaryMonth = computed(() => {
  const first = activeMedications.value[0];
  return first ? adherenceCalendar(first.id, 30) : [];
});

function goToCheckIn(medicationId: string) {
  router.push({ name: "check-in", params: { medicationId } });
}
</script>

<template>
  <div class="screen">
    <TopBar show-text-toggle />

    <p class="label text-muted">{{ dateLabel }}</p>
    <h1 class="display-lg today__headline">
      <template v-if="allTaken">You're <span class="emphasis">on track</span>.</template>
      <template v-else-if="anyOverdue">Still time to <span class="emphasis">catch up</span>.</template>
      <template v-else>Ready when <span class="emphasis">you</span> are.</template>
    </h1>

    <div class="stack-md today__meds">
      <article v-for="med in activeMedications" :key="med.id" class="card today__med">
        <div class="cluster-between">
          <div>
            <p class="headline-md">{{ med.name }}</p>
            <p class="body-sm text-muted">{{ med.dosage }}</p>
          </div>
          <IconButton variant="ghost" :to="`/medications/${med.id}`" :ariaLabel="`See what ${med.name} looks like`">
            <Eye :size="18" :stroke-width="1.75" />
          </IconButton>
        </div>

        <div v-if="isTakenToday(med.id)" class="today__taken">
          <span class="today__taken-check"><Check :size="14" :stroke-width="2" /></span>
          <span class="body-sm">
            Taken at {{ formatTime(todaysLogEntry(med.id)!.takenAt) }}
          </span>
          <FeelingBadge :feeling="todaysLogEntry(med.id)!.feeling" />
        </div>

        <template v-else>
          <p v-if="isOverdue(med)" class="today__overdue body-sm">
            <AlertCircle :size="15" :stroke-width="1.75" />
            A little overdue — no rush, just don't forget.
          </p>
          <PillButton variant="primary" block @click="goToCheckIn(med.id)">Mark as taken</PillButton>
        </template>
      </article>

      <p v-if="!activeMedications.length" class="card body-md text-muted">
        No medications are on today's schedule yet.
      </p>
    </div>

    <section v-if="activeMedications.length" class="today__streak">
      <div class="spectrum-band">
        <p class="label">Adherence streak</p>
        <p class="display-lg today__streak-count">{{ primaryStreak }} {{ primaryStreak === 1 ? "day" : "days" }}</p>
        <p class="body-sm today__streak-copy">Keep it going — consistency is what makes this medication work.</p>
        <AdherenceCalendar :days="primaryMonth" class="today__calendar" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.today__headline {
  margin-bottom: var(--space-lg);
  max-width: 14ch;
}

.today__taken {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.today__taken-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-on-inverse);
  flex: none;
}

.today__overdue {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-secondary);
  margin: 0;
}

.today__streak {
  margin-top: var(--space-xl);
}

.today__streak-count {
  margin-top: var(--space-xs);
}

.today__streak-copy {
  margin-bottom: 0;
}

.today__calendar {
  margin-top: var(--space-lg);
}
</style>
