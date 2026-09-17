<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronRight, Search, Shuffle } from "lucide-vue-next";
import { useAppState } from "../composables/useAppState";
import TopBar from "../components/TopBar.vue";

const { medications } = useAppState();
const query = ref("");

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return medications;
  return medications.filter((med) => {
    const haystack = [med.name, med.genericName, ...med.aliases, med.category].join(" ").toLowerCase();
    return haystack.includes(q);
  });
});
</script>

<template>
  <div class="screen">
    <TopBar title="Medications" />

    <h1 class="display-lg medications__headline">Same medicine, <span class="emphasis">different look</span>.</h1>
    <p class="body-md text-muted">
      Look up appearance, side effects and interactions for anything you're taking.
    </p>

    <label class="field medications__search">
      <span class="field__label sr-only">Search medications</span>
      <div class="medications__search-input">
        <Search :size="18" :stroke-width="1.75" />
        <input v-model="query" class="input" type="search" placeholder="Search by name…" />
      </div>
    </label>

    <router-link to="/interactions" class="card medications__interactions">
      <span class="medications__interactions-icon"><Shuffle :size="18" :stroke-width="1.75" /></span>
      <span>
        <span class="body-md medications__interactions-title">Check two medications together</span>
        <span class="body-sm text-muted medications__interactions-sub">See a plain-language caution level</span>
      </span>
      <ChevronRight :size="18" :stroke-width="1.75" class="medications__interactions-chevron" />
    </router-link>

    <div class="stack-sm medications__list">
      <router-link
        v-for="med in results"
        :key="med.id"
        :to="`/medications/${med.id}`"
        class="card medications__item"
      >
        <div>
          <p class="body-md medications__item-name">{{ med.name }}</p>
          <p class="body-sm text-muted">{{ med.category }} · {{ med.dosage }}</p>
        </div>
        <ChevronRight :size="18" :stroke-width="1.75" class="medications__item-chevron" />
      </router-link>

      <p v-if="!results.length" class="card body-md text-muted">No medications match "{{ query }}".</p>
    </div>
  </div>
</template>

<style scoped>
.medications__headline {
  margin-top: var(--space-sm);
  max-width: 20ch;
}

.medications__search {
  margin: var(--space-lg) 0;
}

.medications__search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.medications__search-input svg {
  position: absolute;
  left: 14px;
  color: var(--color-secondary);
  pointer-events: none;
}

.medications__search-input .input {
  padding-left: 42px;
}

.medications__interactions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.medications__interactions-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-on-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.medications__interactions-title {
  display: block;
  font-weight: 500;
}

.medications__interactions-sub {
  display: block;
}

.medications__interactions-chevron {
  margin-left: auto;
  color: var(--color-secondary);
  flex: none;
}

.medications__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.medications__item-name {
  font-weight: 500;
}

.medications__item-chevron {
  color: var(--color-secondary);
  flex: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
