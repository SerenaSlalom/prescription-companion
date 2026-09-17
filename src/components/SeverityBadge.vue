<script setup lang="ts">
import { computed } from "vue";
import { AlertTriangle, Info, OctagonAlert } from "lucide-vue-next";
import type { InteractionSeverity } from "../types";

const props = defineProps<{ severity: InteractionSeverity }>();

const meta: Record<InteractionSeverity, { label: string; icon: typeof Info; class: string }> = {
  monitor: { label: "Worth noting", icon: Info, class: "severity--monitor" },
  caution: { label: "Use caution", icon: AlertTriangle, class: "severity--caution" },
  avoid: { label: "Avoid combining", icon: OctagonAlert, class: "severity--avoid" },
};

const current = computed(() => meta[props.severity]);
</script>

<template>
  <span class="severity-badge" :class="current.class">
    <component :is="current.icon" :size="14" :stroke-width="1.75" />
    {{ current.label }}
  </span>
</template>

<style scoped>
.severity-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: calc(var(--text-label-sm) * var(--text-scale));
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid var(--color-border);
}

.severity--monitor {
  color: var(--color-secondary);
}

.severity--caution {
  color: #8a5a2c;
  border-color: color-mix(in srgb, #8a5a2c 30%, var(--color-border));
}

.severity--avoid {
  color: var(--color-error);
  border-color: color-mix(in srgb, var(--color-error) 30%, var(--color-border));
}
</style>
