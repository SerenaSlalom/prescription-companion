<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "inverse";
    to?: string;
    type?: "button" | "submit";
    block?: boolean;
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    type: "button",
    block: false,
    disabled: false,
  }
);

const tag = computed(() => (props.to ? "router-link" : "button"));
const classes = computed(() => [
  "btn",
  `btn--${props.variant}`,
  { "btn--block": props.block },
]);
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="!to ? type : undefined"
    :disabled="!to ? disabled : undefined"
    :class="classes"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
