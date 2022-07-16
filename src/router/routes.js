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

  {
    path: "/myapp",
    component: () => import("layouts/MyAppAuthLy.vue"),
    children: [
      { path: "", component: () => import("pages/myapp/LoginPage.vue") },
      {
        path: "recover",
        component: () => import("pages/myapp/RecoverPage.vue"),
      },
      {
        path: "change",
        component: () => import("pages/myapp/ChangePage.vue"),
      },
      { path: "singup", component: () => import("pages/myapp/SingUpPage.vue") },
    ],
  },
];

export default routes;
