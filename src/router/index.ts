import { createRouter, createWebHistory } from "vue-router";
import { useAppState } from "../composables/useAppState";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/welcome",
      name: "onboarding",
      component: () => import("../views/OnboardingView.vue"),
    },
    {
      path: "/",
      name: "today",
      component: () => import("../views/TodayView.vue"),
    },
    {
      path: "/check-in/:medicationId",
      name: "check-in",
      component: () => import("../views/CheckInView.vue"),
      props: true,
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/HistoryView.vue"),
    },
    {
      path: "/medications",
      name: "medications",
      component: () => import("../views/MedicationsView.vue"),
    },
    {
      path: "/medications/:id",
      name: "medication-detail",
      component: () => import("../views/MedicationDetailView.vue"),
      props: true,
    },
    {
      path: "/interactions",
      name: "interactions",
      component: () => import("../views/InteractionCheckView.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const { onboarded } = useAppState();
  if (!onboarded.value && to.name !== "onboarding") {
    return { name: "onboarding" };
  }
  if (onboarded.value && to.name === "onboarding") {
    return { name: "today" };
  }
  return true;
});

export default router;
