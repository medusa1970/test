import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useRoleStore = defineStore("RoleStore", {
  state: () => ({
    areas: "",
    areaSelected: "",
    accessSelected: "",
    linksSelected: "",
    user: {},
  }),
  getters: {
    getAreas: (state) => state.areas,
  },
  actions: {
    async load() {
      await api.get("api/user/area").then((res) => {
        this.areas = res.data.area;
      });
    },
    addArea(name, icon) {
      this.areas.push({ name, typeuser: 0, icon });
    },
    selectedArea(item) {
      this.areaSelected = item;
      this.accessSelected = "";
      this.linksSelected = "";
    },
    selectedAccess(item) {
      this.accessSelected = item;
      this.linksSelected = "";
    },
    selectedLinks(item) {
      this.linksSelected = item;
      let id = this.linksSelected._id;

      //this.linksSelected.name = "jaimito";
      //this.accessSelected.links.push({ name: "chiwawa", route: "waw1" });
      //this.accessSelected.links.splice(this.accessSelected.links.indexOf(id), 1);
      this.accessSelected.links = this.accessSelected.links.filter(
        (link) => link._id !== id
      );
    },
    login(username, password) {
      console.log(username, password);
      try {
        this.user = api.post("api/auth/signin", { username, password });
        console.log(this.user);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
