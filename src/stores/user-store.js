import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    Users: [],
    Roles: [],
    rolesUser: [],
    rolesCurrent: [],
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
        this.selectTypes();
        $q.loading.hide();


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

/*     addUser(user) {
      this.Users.push(user);
      this.newUser = user;
    },
 */
    addUser(users, id) {
      this.Users= users;
      console.log(users, id);
      // load function editUser(id)
      this.editUser(id);
    },

    putUser(email, username, password) {
      this.newUser.email = email;
      this.newUser.username = username;
      this.newUser.password = password;
    },

    async editUser(id) {
      const userCurrent = this.Users.find((user) => user._id === id);
      this.newUser = userCurrent;
      const {data} = await api.get(`api/users/role-user/${id}`);
      this.rolesCurrent = await data.rolesUser;
      this.rolesUser = await data.rolesUser;
    },

    async deleteUser(_id) {
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
        this.selectTypes();
      } catch (error) {
        console.log(error);
      }
    },

    async addPoint(name, abbreviation, address, phone) {
      try {
        const { data } = await api.post("/api/points", {
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
        await this.selectAreas(idType.value);
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
        await this.selectAreas(idType.value);
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
        await this.selectAreas(idType.value);
        await this.selectPositionsAccess(idArea.value);
      } catch (error) {
        console.log(error);
      }
    },

    async selectTypes() {
      const dataType = this.Roles.map((item) => ({
        label: item.type.name,
        icon: item.type.icon,
        value: item._id,
      }));
      this.Types = dataType;
    },

    async selectPoint(id) {
      this.rolesUser.point = id;
    },

    async selectAreas(id) {
      delete this.rolesUser.area;
      this.AreasTmp = await this.Roles.find((role) => role._id === id).area;
      this.Areas = this.AreasTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: item.icon,
      }));
      this.rolesUser.type = id;
      this.rolesUser._id = this.newUser._id
    },

    async selectPositionsAccess(id) {
      if (id === undefined) return;
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

      this.rolesUser.area = id;
    },

    async selectPosition(id) {
      this.rolesUser.position = id;
    },

    async selectAccess(data) {
      this.rolesUser.access = data.map((item) => item.value);
    },

    async selectRoutes(data) {
      this.rolesUser.routes = data.map((item) => item.map((item) => item.value)).flat();
    },
  },
});
