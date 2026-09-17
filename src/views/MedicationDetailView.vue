<script setup lang="ts">
import { computed } from "vue";
import { useAppState } from "../composables/useAppState";
import { guessSwatch } from "../utils/colorSwatch";
import TopBar from "../components/TopBar.vue";
import Disclaimer from "../components/Disclaimer.vue";
import SeverityBadge from "../components/SeverityBadge.vue";

const props = defineProps<{ id: string }>();
const { getMedication } = useAppState();

const medication = computed(() => getMedication(props.id));

function shapeStyle(shape: string) {
  const s = shape.toLowerCase();
  if (s.includes("capsule")) return { width: "56px", height: "26px", borderRadius: "13px" };
  if (s.includes("oval")) return { width: "52px", height: "30px", borderRadius: "50%" };
  if (s.includes("oblong")) return { width: "62px", height: "24px", borderRadius: "12px" };
  return { width: "40px", height: "40px", borderRadius: "50%" };
}
</script>

<template>
  <div v-if="medication" class="screen">
    <TopBar back />

    <p class="label text-muted">{{ medication.category }}</p>
    <h1 class="display-lg medication__name">{{ medication.name }}</h1>
    <p class="body-md text-muted medication__aliases">
      Also known as {{ medication.aliases.join(", ") }} · generic: {{ medication.genericName }}
    </p>
    <p class="body-md medication__dosage">{{ medication.dosage }}</p>

    <section class="stack-md medication__section">
      <h2 class="headline-md">What it can look like</h2>
      <p class="body-sm text-muted">
        Appearance can vary by manufacturer, even for the exact same dose — this is normal, especially
        after an insurance or pharmacy switch.
      </p>
      <div class="hscroll">
        <div v-for="appearance in medication.appearances" :key="appearance.manufacturer" class="card medication__pill-card">
          <div class="medication__pill-visual">
            <span class="medication__pill-shape" :style="{ ...shapeStyle(appearance.shape), backgroundColor: guessSwatch(appearance.color) }">
              {{ appearance.imprint !== "none" ? appearance.imprint : "" }}
            </span>
          </div>
          <p class="label medication__pill-manufacturer">{{ appearance.manufacturer }}</p>
          <p class="body-sm">{{ appearance.description }}</p>
        </div>
      </div>
    </section>

    <section class="stack-md medication__section">
      <h2 class="headline-md">Common side effects</h2>
      <ul class="medication__list">
        <li v-for="effect in medication.sideEffects" :key="effect" class="body-md">{{ effect }}</li>
      </ul>
    </section>

    <section class="stack-md medication__section">
      <h2 class="headline-md">Notable interactions</h2>
      <div class="stack-sm">
        <article v-for="interaction in medication.interactions" :key="interaction.with" class="card medication__interaction">
          <div class="cluster-between">
            <p class="body-md medication__interaction-with">{{ interaction.with }}</p>
            <SeverityBadge :severity="interaction.severity" />
          </div>
          <p class="body-sm text-muted medication__interaction-note">{{ interaction.note }}</p>
        </article>
      </div>
    </section>

    <Disclaimer />
  </div>

  <div v-else class="screen">
    <TopBar back />
    <p class="body-md text-muted">We couldn't find that medication.</p>
  </div>
</template>

<style scoped>
.medication__name {
  margin-top: var(--space-xs);
}

.medication__aliases {
  margin-top: var(--space-sm);
}

.medication__dosage {
  margin-top: var(--space-xs);
  font-weight: 500;
}

.medication__section {
  margin-top: var(--space-xl);
}

.medication__pill-card {
  flex: none;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.medication__pill-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
}

.medication__pill-shape {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid rgba(20, 20, 18, 0.12);
}

.medication__pill-manufacturer {
  color: var(--color-secondary);
}

.medication__list {
  margin: 0;
  padding-left: 1.25em;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.medication__interaction-with {
  font-weight: 500;
}

.medication__interaction-note {
  margin-top: var(--space-sm);
}
</style>
