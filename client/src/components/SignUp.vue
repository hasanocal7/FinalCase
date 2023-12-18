<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="register">
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field v-model="password" label="Password"></v-text-field>
        <v-select
          v-model="authority"
          label="Authority"
          :items="['admin', 'editor']"
        ></v-select>
        <v-btn type="submit" color="primary" block class="mt-2">Sign Up</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      authority: "",
    };
  },
  methods: {
    register() {},
  },
};
</script>
