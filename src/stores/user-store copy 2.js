import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    Users: [],
    Roles: [],
    rolesUser: {},
    rolesNew: {},
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
      this.editUser(id);
    },

    putUser(email, username, password) {
      this.newUser.email = email;
      this.newUser.username = username;
      this.newUser.password = password;
    },

    async editUser(id) {
      this.newUser = await this.Users.find((user) => user._id === id);
      try {
        const {data} = await api.get(`api/users/role-user/${id}`);
        this.rolesUser = data.rolesUser;
        this.rolesNew = {};
      } catch (error) {
        console.log(error);
      }
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
        this.buildTypes();
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
        this.buildAreas(idType.value);
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
        await this.buildAreas(idType.value);
        this.buildPositionsAccess(idArea.value);
      } catch (error) {
        console.log(error);
      }
    },

    async addAccess(name, abbreviation, description, icon, idType, idArea) {
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
        await this.buildAreas(idType.value);
        this.buildPositionsAccess(idArea.value);
      } catch (error) {
        console.log(error);
      }
    },

    async addRoute(name, route, description, idType, idArea, idAccess) {
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
        await this.buildAreas(idType.value);
        await this.buildPositionsAccess(idArea.value);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteRolesUser(key) {
      var flag = false;
      if (key == "type" || flag) { this.rolesUser.type = ""; flag = true; }
      if (key == "point" || flag) { this.rolesUser.point = ""; flag = true; }
      if (key == "area" || flag) { this.rolesUser.area = ""; flag = true; }
      if (key == "position" || flag) { this.rolesUser.position = ""; flag = true; }
      if (key == "access" || flag) { this.rolesUser.access = []; this.rolesUser.routes = []; }
    },

    async buildTypes() {
      this.Types = this.Roles.map((item) => ({
        label: item.type.name,
        icon: item.type.icon,
        value: item._id,
      }));
    },

    async buildAreas(id) {
      this.AreasTmp = await this.Roles.find((role) => role._id === id).area;
      this.Areas = this.AreasTmp.map((item) => ({
        label: item.name,
        value: item._id,
        icon: item.icon,
      }));
    },

    async buildPositionsAccess(id) {
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
    },

    // Asignar valores de los selectores a rolesUser
    async selectType(id) {
      this.rolesNew.type = id;
    },

    async selectPoint(id) {
      this.rolesNew.point = id;
    },
    async selectArea(id) {
      this.rolesNew.area = id;
    },

    async selectPosition(id) {
      this.rolesNew.position = id;
    },

    async selectAccess(data) { console.log(data);
      this.rolesNew.access = data.map((item) =>
        {
          return item.value
        }
      );
    },

    async selectRoutes(data) {
      this.rolesNew.routes = data.map((item) => item.map((item) => item.value)).flat();
    },

    async saveRoles(password) {
      try {
        const { data } = await api.post(`/api/users/role-user/${this.newUser._id}`, {rolesNew: this.rolesNew, username: this.newUser.username, password});
        this.rolesUser = data.roleUser;
        if(data.error === null){
          return {value: true, message: data.message};
        }else{
          return {value: false, message: data.message};
        };
      } catch (error) {
        console.log(error);
        return {value: false, message: data.message};
      }
    },
  },
});
