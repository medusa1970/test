import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useRoleStore = defineStore("RoleStore", {
  state: () => ({
    areas: "",
    access: "",
    links: "",
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
    listAccess(item) {
      this.access = item;
      this.links = "";
    },
    listLinks(item) {
      this.links = item;
    },
  },
});
