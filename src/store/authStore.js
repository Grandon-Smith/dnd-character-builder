import { defineStore } from "pinia";
import { authServices } from "../services/auth.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    authChecked: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async checkAuth() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      try {
        const user = await authServices.currentUser(options);

        this.user = user;
      } catch {
        this.user = null;
      } finally {
        this.authChecked = true;
      }
    },
  },
});
