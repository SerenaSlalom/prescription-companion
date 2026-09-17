<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import BottomNav from "./components/BottomNav.vue";

const route = useRoute();
const showNav = computed(() => route.name !== "onboarding" && route.name !== "check-in");
</script>

<template>
  <router-view />
  <BottomNav v-if="showNav" />
</template>
