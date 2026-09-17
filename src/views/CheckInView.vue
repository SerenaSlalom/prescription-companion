<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { AlertTriangle, Check, Frown, Smile, TrendingDown } from "lucide-vue-next";
import { useAppState } from "../composables/useAppState";
import type { Feeling } from "../types";
import TopBar from "../components/TopBar.vue";
import PillButton from "../components/PillButton.vue";

const props = defineProps<{ medicationId: string }>();

const router = useRouter();
const { getMedication, recordDose } = useAppState();

const medication = computed(() => getMedication(props.medicationId));

const options: { value: Feeling; label: string; icon: typeof Smile }[] = [
  { value: "fine", label: "Feeling fine", icon: Smile },
  { value: "mild_side_effect", label: "Mild side effect", icon: Frown },
  { value: "not_working", label: "Not working", icon: TrendingDown },
  { value: "something_off", label: "Something's off", icon: AlertTriangle },
];

const selected = ref<Feeling | null>(null);
const note = ref("");
const submitted = ref(false);

function confirm() {
  if (!selected.value || !medication.value) return;
  recordDose(medication.value.id, selected.value, note.value);
  submitted.value = true;
  window.setTimeout(() => {
    router.replace({ name: "today" });
  }, 900);
}
</script>

<template>
  <div class="screen check-in">
    <TopBar back />

    <Transition name="swap" mode="out-in">
      <div v-if="!submitted" key="form" class="stack-lg">
        <div>
          <h1 class="headline-lg">How are you feeling?</h1>
          <p class="body-sm text-muted" v-if="medication">
            Logging {{ medication.name }} · a note is optional
          </p>
        </div>

        <div class="check-in__options" role="radiogroup" aria-label="How are you feeling">
          <button
            v-for="option in options"
            :key="option.value"
            type="button"
            class="check-in__option"
            :class="{ 'check-in__option--selected': selected === option.value }"
            role="radio"
            :aria-checked="selected === option.value"
            @click="selected = option.value"
          >
            <component :is="option.icon" :size="20" :stroke-width="1.75" />
            <span class="body-md">{{ option.label }}</span>
          </button>
        </div>

        <label class="field">
          <span class="field__label">Add a note (optional)</span>
          <textarea
            v-model="note"
            class="input"
            rows="3"
            placeholder="Anything worth remembering — how it felt, when, anything unusual…"
          />
        </label>

        <PillButton variant="primary" block :disabled="!selected" @click="confirm">Confirm</PillButton>
      </div>

      <div v-else key="confirm" class="check-in__confirm">
        <span class="check-in__confirm-icon"><Check :size="28" :stroke-width="2" /></span>
        <p class="headline-md">Logged.</p>
        <p class="body-sm text-muted">Nice work — see you tomorrow.</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.check-in {
  padding-bottom: var(--space-2xl);
}

.check-in__options {
  display: grid;
  gap: var(--space-sm);
}

.check-in__option {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-raised);
  color: var(--color-on-surface);
  cursor: pointer;
  text-align: left;
  transition: border-color var(--transition), background-color var(--transition);
}

.check-in__option:hover {
  border-color: var(--color-secondary);
}

.check-in__option--selected {
  border-color: var(--color-primary);
  background-color: var(--color-surface);
  box-shadow: inset 0 0 0 1px var(--color-primary);
}

.check-in__confirm {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  text-align: center;
}

.check-in__confirm-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-on-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-sm);
  animation: pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 180ms ease;
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
}
</style>
