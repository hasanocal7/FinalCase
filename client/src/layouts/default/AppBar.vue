<template>
  <v-app-bar elevation="2">
    <v-app-bar-title>
      <v-btn @click="routeHome">
        <v-icon icon="mdi-factory" />
        Factory Provider
      </v-btn>
    </v-app-bar-title>
    <template v-if="!authStore.loggedIn">
      <v-btn @click="routeLogin">Sign In</v-btn>
      <v-btn @click="routeSignUp">Sign Up</v-btn>
    </template>
    <template v-else>
      <v-btn @click="routeUserSettings">{{ "Hasan" }}</v-btn>
      <v-btn @click="routeDashboard">Dashboard</v-btn>
      <v-btn @click="routeLogout">Logout</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const routeHome = () => {
      router.push({ path: "/" });
    };
    const routeLogin = () => {
      router.push({ path: "/login" });
    };
    const routeSignUp = () => {
      router.push({ path: "/register" });
    };
    const routeDashboard = () => {
      router.push({ path: "/dashboard" });
    };
    const routeUserSettings = () => {
      router.push({ path: "/user-settings" });
    };
    const routeLogout = async () => {
      delete (await axios.defaults.headers.common["Authorization"]);
      const refreshToken = localStorage("Authorization");
      if (refreshToken) {
        localStorage.removeItem("Authorization");
      }
      authStore.setLoggedIn(false);
      router.push({ path: "/" });
    };

    return {
      authStore,
      routeHome,
      routeLogin,
      routeSignUp,
      routeDashboard,
      routeUserSettings,
      routeLogout,
    };
  },
};
</script>
