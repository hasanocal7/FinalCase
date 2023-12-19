<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="register">
        <v-text-field
          v-model="name"
          label="Name"
          name="name"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          name="email"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          name="password"
          type="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-select
          v-model="authority"
          label="Authority"
          name="authority"
          :items="['admin', 'editor']"
          :rules="authorityRules"
        ></v-select>
        <v-btn type="submit" color="primary" block class="mt-2">Sign Up</v-btn>
        <v-alert
          v-if="registrationError"
          type="error"
          dismissible
          transition="scale-transition"
        >
          {{ registrationError }}
        </v-alert>
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
      nameRules: [
        (v) => v.length >= 8 || "Name must be at least 8 characters.",
        (v) =>
          /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]+$/.test(v) ||
          "The name must contain only letters.",
      ],
      registrationError: null,
      emailRules: [
        (v) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
          "Please enter a valid email address.",
      ],
      passwordRules: [
        (v) => v.length >= 8 || "Password must be at least 8 characters.",
        (v) =>
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          ) ||
          "The password must contain at least one letter, one number, and one special character.",
      ],
      authorityRules: [(v) => !!v || "You have to choose the authority."],
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

      console.log(data);

      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          data
        );
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          console.error("Server Response:", error.response.data);
          this.registrationError =
            error.response.data.message || "An unexpected error occurred.";
        } else {
          console.error("Unexpected Error:", error.message);
          this.registrationError = "An unexpected error occurred.";
        }
      }
    },
  },
};
</script>
