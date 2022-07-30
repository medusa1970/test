import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: "",
  }),
  actions: {
    async signin(username, password) {
      try {
        const response = await api.post("api/auth/signin", {
          username,
          password,
        });
        return (this.user = response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      this.user = "";
    },
  },
});
