const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "components",
        component: () => import("pages/ComponentPage.vue"),
      },
      {
        path: "fundaments",
        component: () => import("pages/FundamentsPage.vue"),
      },
      {
        path: "experiments",
        component: () => import("pages/ExperimentsPage.vue"),
      },
      {
        path: "practices",
        component: () => import("pages/PracticesPage.vue"),
      },
      {
        path: "protected",
        component: () => import("pages/ProtectedPage.vue"),
      },
    ],
  },

  {
    path: "/curso",
    component: () => import("layouts/CursoLy.vue"),
    children: [
      { path: "", component: () => import("pages/curso/HijoPage.vue") },
      {
        path: "hijouno",
        component: () => import("pages/curso/HijoUnoPage.vue"),
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminAuthLy.vue"),
    children: [
      { path: "", component: () => import("pages/admin/AdminPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
