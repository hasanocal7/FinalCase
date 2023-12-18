<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="register">
        <v-text-field v-model="name" label="Name" name="name"></v-text-field>
        <v-text-field v-model="email" label="Email" name="email"></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          name="password"
        ></v-text-field>
        <v-select
          v-model="authority"
          label="Authority"
          name="authority"
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
    async register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        authority: this.authority,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          data
        );
        console.log(response);
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.response
        ) {
          console.error("Server Response:", error.response.data.response);
        } else {
          console.error("Unexpected Error:", error.message);
        }
      }
    },
  },
};
</script>
