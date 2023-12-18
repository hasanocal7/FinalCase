<template>
  <v-app-bar elevation="2">
    <v-app-bar-title>
      <v-btn @click="routeHome">
        <v-icon icon="mdi-factory" />
        Factory Provider
      </v-btn>
    </v-app-bar-title>
    <v-btn @click="routeLogin">Sign In</v-btn>
    <v-btn @click="routeSignUp">Sign Up</v-btn>
  </v-app-bar>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isUserLoggedIn: false,
    };
  },

  mounted() {
    this.checkUserLoginStatus();
  },

  methods: {
    async checkUserLoginStatus() {
      this.isUserLoggedIn = "";
    },

    routeHome() {
      this.$router.push({ path: "/" });
    },

    routeLogin() {
      this.$router.push({ path: "/login" });
    },

    routeSignUp() {
      this.$router.push({ path: "/register" });
    },

    routeDashboard() {
      this.$router.push({ path: "/dashboard" });
    },

    routeUserSettings() {
      this.$router.push({ path: "/user-settings" });
    },
  },
};
</script>
