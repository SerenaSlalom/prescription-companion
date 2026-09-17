<script setup lang="ts">
import { Leaf } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAppState } from "../composables/useAppState";
import PillButton from "../components/PillButton.vue";

const router = useRouter();
const { completeOnboarding } = useAppState();

function start() {
  completeOnboarding();
  router.replace({ name: "today" });
}
</script>

<template>
  <div class="onboarding center">
    <div class="onboarding__mark">
      <Leaf :size="22" :stroke-width="1.75" />
    </div>

    <h1 class="display-lg onboarding__title">
      Let's keep track, <span class="emphasis">together</span>.
    </h1>

    <p class="body-lg text-muted onboarding__subtitle">
      Calla helps you log your daily dose, notice how you're feeling day to day, and know
      exactly what you're taking — no account, no clinical jargon.
    </p>

    <div class="card onboarding__persona">
      <p class="label onboarding__persona-label">For this demo</p>
      <p class="body-md">
        You're stepping into Jordan's day: eight months into a daily maintenance medication,
        with a new refill that looks different than expected.
      </p>
    </div>

    <PillButton variant="primary" block @click="start">Get started</PillButton>
  </div>
</template>

<style scoped>
.onboarding {
  min-height: 100vh;
  min-height: 100dvh;
  max-width: var(--width-column);
  margin-inline: auto;
  padding: var(--space-2xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
}

.onboarding__mark {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-on-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-sm);
}

.onboarding__title {
  max-width: 16ch;
}

.onboarding__subtitle {
  max-width: 38ch;
}

.onboarding__persona {
  text-align: left;
  width: 100%;
  margin-top: var(--space-md);
}

.onboarding__persona-label {
  color: var(--color-secondary);
  margin-bottom: var(--space-xs);
}

.onboarding :deep(.btn) {
  margin-top: var(--space-md);
}
</style>
