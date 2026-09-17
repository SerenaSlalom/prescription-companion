<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppState } from "../composables/useAppState";
import type { InteractionSeverity } from "../types";
import TopBar from "../components/TopBar.vue";
import SeverityBadge from "../components/SeverityBadge.vue";

const { medications } = useAppState();

const items = computed(() => [
  ...medications.map((med) => ({ key: med.id, label: med.name })),
  { key: "alcohol", label: "Alcohol" },
]);

const selectedA = ref(items.value[0]?.key ?? "");
const selectedB = ref(items.value[1]?.key ?? "");

function labelFor(key: string) {
  return items.value.find((item) => item.key === key)?.label ?? "";
}

interface Result {
  severity: InteractionSeverity;
  note: string;
}

const result = computed<Result | null>(() => {
  if (!selectedA.value || !selectedB.value || selectedA.value === selectedB.value) return null;

  const medA = medications.find((m) => m.id === selectedA.value);
  const medB = medications.find((m) => m.id === selectedB.value);
  const labelB = labelFor(selectedB.value).toLowerCase();
  const labelA = labelFor(selectedA.value).toLowerCase();

  const fromA = medA?.interactions.find((i) => i.with.toLowerCase() === labelB);
  if (fromA) return { severity: fromA.severity, note: fromA.note };

  const fromB = medB?.interactions.find((i) => i.with.toLowerCase() === labelA);
  if (fromB) return { severity: fromB.severity, note: fromB.note };

  return null;
});

const sameSelection = computed(() => selectedA.value === selectedB.value);
</script>

<template>
  <div class="screen">
    <TopBar back title="Interaction check" />

    <h1 class="display-lg interactions__headline">Checking two <span class="emphasis">together</span>.</h1>
    <p class="body-md text-muted">
      Pick two things you take and get a plain-language caution level. This covers only the
      medications in this demo's mock list.
    </p>

    <div class="stack-md interactions__pickers">
      <label class="field">
        <span class="field__label">First</span>
        <select v-model="selectedA" class="input">
          <option v-for="item in items" :key="item.key" :value="item.key">{{ item.label }}</option>
        </select>
      </label>
      <label class="field">
        <span class="field__label">Second</span>
        <select v-model="selectedB" class="input">
          <option v-for="item in items" :key="item.key" :value="item.key">{{ item.label }}</option>
        </select>
      </label>
    </div>

    <p v-if="sameSelection" class="card body-md text-muted interactions__result">
      Pick two different things to compare.
    </p>

    <div v-else class="card interactions__result">
      <div v-if="result" class="stack-sm">
        <div class="cluster-between">
          <p class="body-md interactions__pair">{{ labelFor(selectedA) }} + {{ labelFor(selectedB) }}</p>
          <SeverityBadge :severity="result.severity" />
        </div>
        <p class="body-sm text-muted">{{ result.note }}</p>
      </div>
      <div v-else class="stack-sm">
        <p class="body-md interactions__pair">{{ labelFor(selectedA) }} + {{ labelFor(selectedB) }}</p>
        <p class="body-sm text-muted">
          No known interaction on file between these two — that doesn't guarantee it's fine, so it's
          still worth a quick check with a pharmacist.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interactions__headline {
  margin-top: var(--space-sm);
  max-width: 18ch;
}

.interactions__pickers {
  margin: var(--space-lg) 0;
}

.interactions__result {
  margin-top: var(--space-md);
}

.interactions__pair {
  font-weight: 500;
}
</style>
