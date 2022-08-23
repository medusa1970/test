import { defineStore } from "pinia";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    loggedIn: null,
    listUsers: null,
  }),

  actions: {
    async signin(username, password) {
      try {
        const { data } = await api.post("api/auth/signin", {
          username,
          password,
        });
        console.log(data);
        LocalStorage.set("loggedIn", {
          type: data.type,
          token: data.token,
          refreshtoken: data.refreshtoken,
          username: data.username,
        });
        this.loggedIn = data;
      } catch (error) {
        this.loggedIn = null;
        LocalStorage.remove("loggedIn");
      }
    },

    async users() {
      try {
        const { data } = await api.get("api/user");
        this.listUsers = data;
      } catch (error) {
        console.log(error);
      }
    },

    async refreshLoggedIn() {
      this.loggedIn = LocalStorage.getItem("loggedIn");
      try {
        const { token, refreshtoken, username, type } =
          LocalStorage.getItem("loggedIn");
        const { data } = await api.post("api/auth/refresh", {
          token,
          refreshtoken,
          username,
          type,
        });
        LocalStorage.set("loggedIn", {
          token: data.token,
          refreshtoken: data.refreshtoken,
          username: data.username,
          type: data.type,
        });
        this.loggedIn = data;
      } catch (error) {
        this.loggedIn = null;
        LocalStorage.remove("loggedIn");
      }
    },

    async logout() {
      this.loggedIn = null;
    },
  },
});
