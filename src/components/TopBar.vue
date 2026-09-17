<script setup lang="ts">
import { ArrowLeft, Type } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAppState } from "../composables/useAppState";
import IconButton from "./IconButton.vue";

withDefaults(
  defineProps<{
    title?: string;
    back?: boolean;
    showTextToggle?: boolean;
  }>(),
  {
    back: false,
    showTextToggle: false,
  }
);

const router = useRouter();
const { toggleTextSize, textLarge } = useAppState();
</script>

<template>
  <header class="top-bar">
    <IconButton v-if="back" variant="ghost" ariaLabel="Go back" @click="router.back()">
      <ArrowLeft :size="18" :stroke-width="1.75" />
    </IconButton>
    <div v-else class="top-bar__spacer" />

    <h1 v-if="title" class="label top-bar__title">{{ title }}</h1>

    <IconButton
      v-if="showTextToggle"
      variant="ghost"
      :ariaLabel="textLarge ? 'Use smaller text' : 'Use larger text'"
      @click="toggleTextSize"
    >
      <Type :size="18" :stroke-width="1.75" />
    </IconButton>
    <div v-else class="top-bar__spacer" />
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.top-bar__spacer {
  width: 40px;
  height: 40px;
  flex: none;
}

.top-bar__title {
  color: var(--color-secondary);
}
</style>
