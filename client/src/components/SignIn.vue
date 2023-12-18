<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field v-model="password" label="Password"></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
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
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {},
  },
};
</script>
