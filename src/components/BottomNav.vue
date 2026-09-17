<script setup lang="ts">
import { Clock, Home, Pill } from "lucide-vue-next";

const tabs = [
  { to: "/", label: "Today", icon: Home },
  { to: "/history", label: "History", icon: Clock },
  { to: "/medications", label: "Medications", icon: Pill },
];
</script>

<template>
  <nav class="bottom-nav" aria-label="Primary">
    <router-link
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': $route.path === tab.to }"
    >
      <component :is="tab.icon" :size="22" :stroke-width="1.75" />
      <span class="label-sm">{{ tab.label }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  padding: var(--space-sm) var(--space-md) calc(var(--space-sm) + env(safe-area-inset-bottom));
  background-color: var(--color-surface-raised);
  border-top: 1px solid var(--color-border);
}

.bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--space-xs) var(--space-md);
  color: var(--color-secondary);
  border-radius: var(--radius-md);
  transition: color var(--transition);
}

.bottom-nav__item--active {
  color: var(--color-primary);
}
</style>
