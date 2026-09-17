<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "ink" | "ghost" | "inverse";
    ariaLabel: string;
    to?: string;
  }>(),
  {
    variant: "ink",
  }
);

const tag = computed(() => (props.to ? "router-link" : "button"));
const classes = computed(() => [
  "btn",
  props.variant === "ghost" ? "btn--icon-ghost" : "btn--icon",
  { "btn--icon-inverse": props.variant === "inverse" },
]);
</script>

<template>
  <component :is="tag" :to="to" :type="!to ? 'button' : undefined" :class="classes" :aria-label="ariaLabel">
    <slot />
  </component>
</template>

<style scoped>
.btn--icon-inverse {
  background-color: var(--color-on-inverse);
  color: var(--color-primary);
}

.btn--icon-inverse:hover {
  background-color: #ffffff;
}
</style>
