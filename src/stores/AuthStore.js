import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: "Jaime Vallejos",
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await api.post("api/auth/signin", {
          username,
          password,
        });
        this.user = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
