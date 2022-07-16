import { defineStore } from "pinia";

export const useRoleStore = defineStore("RoleStore", {
  state: () => ({
    areas: [
      {
        name: "Panaderia",
        typeuser: 0,
        icon: "bakery_dining",
        access: [
          {
            name: "pan1",
            links: [
              { name: "linkpan1", route: "pan1" },
              { name: "linkpan2", route: "pan2" },
              { name: "linkpan3", route: "pan3" },
            ],
          },
          {
            name: "pan2",
            links: [
              { name: "linkpan4", route: "pan4" },
              { name: "linkpan5", route: "pan5" },
              { name: "linkpan6", route: "pan6" },
            ],
          },
        ],
      },
      {
        name: "Almacenes",
        typeuser: 0,
        icon: "warehouse",
        access: [
          {
            name: "alm1",
            links: [
              { name: "linkalm1", route: "alm1" },
              { name: "linkalm2", route: "alm2" },
              { name: "linkalm3", route: "alm3" },
            ],
          },
          {
            name: "alm2",
            links: [
              { name: "linkalm4", route: "alm4" },
              { name: "linkalm5", route: "alm5" },
              { name: "linkalm6", route: "alm6" },
            ],
          },
        ],
      },
      { name: "Administracion", typeuser: 0, icon: "manage_history" },
      { name: "Ventas", typeuser: 0, icon: "point_of_sale" },
    ],
    access: "",
    links: "",
  }),
  getters: {
    getAreas: (state) => state.areas,
  },
  actions: {
    addRole(name, icon) {
      console.log(name, icon);
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
