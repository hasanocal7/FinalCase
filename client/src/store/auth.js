import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: false,
    accessToken: null,
    user: "",
  }),
  actions: {
    login(token) {
      this.loggedIn = true;
      this.accessToken = token;
    },
    logout() {
      this.loggedIn = false;
      this.accessToken = null;
    },
    setAccessToken(token) {
      this.accessToken = token;
    },
    setUserName(name) {
      this.user = name;
    },
  },
});
