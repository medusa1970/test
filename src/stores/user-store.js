import { defineStore } from "pinia";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    Users: [],
    Roles: [],
    Type: [],
    Area: [],
    AreaTmp: [],
    Position: [],
    PositionTmp: [],
    Access: [],
    AccessTmp: [],
    Points: [],
    newUser: [],
  }),

  actions: {
    async users() {
      try {
        const { data } = await api.get("api/user");
        this.Users = data.users;
        this.Roles = data.roles;
        const dataType = this.Roles.map((item) => ({
          label: item.type.name,
          icon: item.type.icon,
          value: item._id,
        }));
        this.Type = dataType;

        const dataPoints = data.points.map((item) => ({
          label: item.name,
          value: item._id,
          icon: "location_on",
        }));
        this.Points = dataPoints;

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

    async addType(name, abbreviation, description, icon) {
      try {
        const { data } = await api.post("/api/user/role", {
          type: {
            name,
            abbreviation,
            description,
            icon,
          },
        });
        this.Roles = data.roles;
        const dataType = this.Roles.map((item) => ({
          label: item.type.name,
          icon: item.type.icon,
          value: item._id,
        }));
        this.Type = dataType;
      } catch (error) {
        console.log(error);
      }
    },

    async addPoint(name, abbreviation, address, phone) {
      try {
        const { data } = await api.post("/api/point", {
          name,
          abbreviation,
          address,
          phone,
        });
        // push new point to array
        this.Points.push({
          label: data.point.name,
          value: data.point._id,
          icon: "location_on",
        });
      } catch (error) {
        console.log(error);
      }
    },

    async selectAreas(id) {
      this.AreaTmp = this.Roles.find((role) => role._id === id).area;
      this.Area = this.AreaTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: item.icon,
      }));
    },

    async selectPositionsAccess(id) {
      this.PositionTmp = this.AreaTmp.find((area) => area._id === id).position;
      this.Position = this.PositionTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: item.icon,
      }));

      this.AccessTmp = this.AreaTmp.find((area) => area._id === id).access;
      this.Access = this.AccessTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: "swap_horiz",
      }));
    },

    async addArea(name, abbreviation, description, icon) {
      try {
      } catch (error) {}
    },
  },
});
