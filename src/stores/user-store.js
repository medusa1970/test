import { defineStore } from "pinia";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    Users: [],
    TypeUser: null,
    Points: null,
    newUser: "jaime vallejos",
  }),

  actions: {
    async users() {
      try {
        const { data } = await api.get("api/user");
        this.Users = data.users;
        this.TypeUser = data.type_users;
        this.Points = data.points;
        LocalStorage.set("data", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    },

    addUser(user) {
      this.Users.push(user);
      this.newUser = user;
    },
    putUser(email, username, password) {
      this.newUser.email = email;
      this.newUser.username = username;
      this.newUser.password = password;
    },

    editUser(id) {
      const data = this.Users.find((user) => user._id === id);
      this.newUser = JSON.stringify(data);
    },
  },
});
