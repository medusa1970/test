import { defineStore } from "pinia";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    Users: [],
    TypeUser: null,
    Points: null,
    newUser: [],
    positions: [],
  }),

  actions: {
    async users() {
      try {
        const { data } = await api.get("api/user");
        this.Users = data.users;
        this.TypeUser = data.type_users;
        this.Points = data.points;
        this.positions = data.positions;
        this.newUser = [];
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
      this.newUser = data;
    },

    async deleteUser(_id) {
      console.log(_id);
      try {
        await api.put(`/api/user/${_id}`, {
          state: "deleted",
        });
        this.Users = this.Users.filter((user) => user._id !== _id);
      } catch (error) {
        console.log(error);
      }
    },

    async addPosition(name, abbreviation, description) {
      try {
        const { data } = await api.post("/api/user/position", {
          name,
          abbreviation,
          description,
        });
        this.positions = data.positions;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
