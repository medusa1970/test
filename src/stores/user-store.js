import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    Users: [],
    Roles: [],
    rolesUser: {},
    Types: [],
    Areas: [],
    AreasTmp: [],
    Position: [],
    PositionTmp: [],
    Access: [],
    AccessTmp: [],
    Routes: [],
    RoutesTmp: "",
    Points: [],
    newUser: [],
  }),

  actions: {
    async users() {
      try {
        const $q = useQuasar();
        $q.loading.show({
          message: "Cargando datos, un momento por favor...",
        });

        const { data } = await api.get("api/users");
        this.Users = data.users;
        this.Roles = data.roles;
        const dataType = this.Roles.map((item) => ({
          label: item.type.name,
          icon: item.type.icon,
          value: item._id,
        }));

        $q.loading.hide();

        this.Types = dataType;

        const dataPoints = data.points.map((item) => ({
          label: item.name,
          value: item._id,
          icon: "location_on",
        }));
        this.Points = dataPoints;

        this.newUser = [];
        //LocalStorage.set("data", JSON.stringify(data)); // ojooo save data in localstorage
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
        const { data } = await api.post("/api/users/role", {
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
        this.Types = dataType;
      } catch (error) {
        console.log(error);
      }
    },

    async addArea(name, abbreviation, description, icon, idType) {
      try {
        const { data } = await api.post(
          "/api/users/role-area/" + idType.value,
          {
            name,
            abbreviation,
            description,
            icon,
          }
        );
        this.Roles = data.roles;
        this.selectAreas(idType.value);
      } catch (error) {
        console.log(error);
      }
    },

    async addPosition(name, abbreviation, description, icon, idType, idArea) {
      try {
        const { data } = await api.post(
          "/api/users/role-area-position/" + idType.value + "/" + idArea.value,
          {
            name,
            abbreviation,
            description,
            icon,
          }
        );
        this.Roles = data.roles;
        this.selectAreas(idType.value);
        this.selectPositionsAccess(idArea.value);
      } catch (error) {
        console.log(error);
      }
    },

    async addAccess(name, abbreviation, description, icon, idType, idArea) {
      console.log(idType.value, idArea.value);
      try {
        const { data } = await api.post(
          "/api/users/role-area-access/" + idType.value + "/" + idArea.value,
          {
            name,
            abbreviation,
            description,
            icon,
          }
        );
        this.Roles = data.roles;
        this.selectAreas(idType.value);
        this.selectPositionsAccess(idArea.value);
      } catch (error) {
        console.log(error);
      }
    },

    async addRoute(name, route, description, idType, idArea, idAccess) {
      console.log(idType.value, idArea.value, idAccess);
      try {
        const { data } = await api.post(
          "/api/users/role-area-access-route/" +
            idType.value +
            "/" +
            idArea.value +
            "/" +
            idAccess,
          {
            name,
            route,
            description,
          }
        );
        this.Roles = data.roles;
        this.selectAreas(idType.value);
        this.selectPositionsAccess(idArea.value);
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
      this.AreasTmp = this.Roles.find((role) => role._id === id).area;
      this.Area = this.AreasTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: item.icon,
      }));
      this.rolesUser.idType = id;
    },

    async selectPositionsAccess(id) {
      this.PositionTmp = this.AreasTmp.find((area) => area._id === id).position;
      this.Position = this.PositionTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: item.icon,
      }));

      this.AccessTmp = this.AreasTmp.find((area) => area._id === id).access;
      this.Access = this.AccessTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: "location_on",
        routes: item.routes,
      }));

      this.rolesUser.idArea = id;
    },

    async selectPosition(id) {
      this.rolesUser.idPosition = id;
    },

    async selectAccess(data) {
      this.rolesUser.Access = data.map((item) => ({
        idAccess: item.value,
        routes: item.routes,
      }));
    },

    async selectRoutes(data) {
      /*       this.RoutesTmp = data.map(
        (item) => item.map((item) => ({ value: item.value })) || []
      );
      */
      this.RoutesTmp = data.map((item) => item.map((item) => item.value) || []);
      this.RoutesTmp = this.RoutesTmp.flat();
      const newAccess = this.rolesUser.Access.map((item) => ({
        idAccess: item.idAccess,
        routes: item.routes.filter((item) => this.RoutesTmp.includes(item._id)),
      }));
      this.Routes = newAccess;
    },
  },
});
