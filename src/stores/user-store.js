import { defineStore } from "pinia";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    Users: null,
    TypeUser: null,
    Points: null,
  }),

  actions: {
    async users() {
      try {
        const { data } = await api.get("api/user");
        this.Users = data.users;
        this.TypeUser = data.type_users;
        this.Points = data.points;
        LocalStorage.set("users", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    },
  },
});
