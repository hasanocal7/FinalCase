// Composables
import { useAuthStore } from "@/store/auth";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
          withoutToken: true,
        },
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register.vue"),
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Table.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.accessToken) return "/login";
});

export default router;
