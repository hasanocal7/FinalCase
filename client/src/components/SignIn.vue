<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-alert
        v-if="loginError"
        type="error"
        dismissible
        transition="scale-transition"
      >
        {{ loginError }}
      </v-alert>
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
          type="email"
          v-model="email"
          label="Email"
          :rules="rules"
          autocomplete="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          name="password"
          type="password"
          :rules="rules"
          autocomplete="current-password"
        ></v-text-field>
        <v-checkbox v-model="rememberMe" label="Remember Me" />
        <v-btn type="submit" color="primary" block>Sign in</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: [(v) => !!v || "This field is required."],
      rememberMe: false,
      loginError: null,
    };
  },
  methods: {
    async login() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          data,
          {}
        );

        this.handleLoginSuccess(response);
      } catch (error) {
        this.handleLoginError(error);
      }
    },

    handleLoginSuccess(response) {
      const { accessToken, refreshToken } = response.data;

      if (this.rememberMe) {
        localStorage.setItem("Authorization", `Bearer ${refreshToken}`);
        axios.defaults.headers.post["Authorization"] = `Bearer ${accessToken}`;
      } else {
        axios.defaults.headers.post["Authorization"] = `Bearer ${accessToken}`;
      }

      const authStore = useAuthStore();
      authStore.setLoggedIn(true);

      this.$router.push({ path: "/" });
    },

    handleLoginError(error) {
      console.error(error);

      if (error.response && error.response.data) {
        console.error("Server Response:", error.response.data);
        this.loginError =
          error.response.data.message || "An unexpected error occurred.";
      } else {
        console.error("Unexpected Error:", error.message);
        this.loginError = "An unexpected error occurred.";
      }
    },
  },
};
</script>
