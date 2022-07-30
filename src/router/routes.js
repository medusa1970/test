const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLy.vue"),
    children: [
      { path: "", component: () => import("pages/main/HomePg.vue") },
      { path: "signin", component: () => import("pages/main/SigninPg.vue") },
    ],
  },
  {
    path: "/aaa",
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
    path: "/admin",
    component: () => import("layouts/AdminAuthLy.vue"),
    children: [
      { path: "", component: () => import("pages/admin/AdminPage.vue") },
    ],
  },
  {
    path: "/myapp",
    component: () => import("layouts/MyAppAuthLy.vue"),
    children: [
      { path: "", component: () => import("pages/myapp/LoginPg.vue") },
      { path: "recover", component: () => import("pages/myapp/RecoverPg.vue") },
      { path: "change", component: () => import("pages/myapp/ChangePg.vue") },
      {
        path: "register",
        component: () => import("pages/myapp/RegisterPg.vue"),
      },
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
