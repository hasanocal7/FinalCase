import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: false,
  }),
  actions: {
    setLoggedIn(value) {
      this.loggedIn = value;
    },
  },
});
