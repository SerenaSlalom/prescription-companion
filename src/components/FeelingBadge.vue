<script setup lang="ts">
import { computed } from "vue";
import { AlertTriangle, Frown, Smile, TrendingDown } from "lucide-vue-next";
import type { Feeling } from "../types";
import { FEELING_LABELS } from "../types";

const props = defineProps<{ feeling: Feeling }>();

const icon = computed(() => {
  switch (props.feeling) {
    case "fine":
      return Smile;
    case "mild_side_effect":
      return Frown;
    case "not_working":
      return TrendingDown;
    case "something_off":
      return AlertTriangle;
    default:
      return Smile;
  }
});

const tone = computed(() => (props.feeling === "something_off" ? "warn" : props.feeling === "fine" ? "ink" : "muted"));
</script>

<template>
  <span class="feeling-badge" :class="`feeling-badge--${tone}`">
    <component :is="icon" :size="14" :stroke-width="1.75" />
    {{ FEELING_LABELS[feeling] }}
  </span>
</template>

<style scoped>
.feeling-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface-raised);
  font-size: calc(var(--text-label-sm) * var(--text-scale));
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.feeling-badge--ink {
  color: var(--color-primary);
}

.feeling-badge--muted {
  color: var(--color-secondary);
}

.feeling-badge--warn {
  color: var(--color-error);
  border-color: color-mix(in srgb, var(--color-error) 30%, var(--color-border));
}
</style>
