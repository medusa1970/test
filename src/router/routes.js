const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLy.vue"),
    children: [
      { path: "", component: () => import("pages/main/HomePg.vue") },
      { path: "signin", component: () => import("pages/main/SigninPg.vue") },
      { path: "signup", component: () => import("pages/main/SignupPg.vue") },
      { path: "recover", component: () => import("pages/main/RecoverPg.vue") },
      { path: "change", component: () => import("pages/main/ChangePg.vue") },
      {
        path: "redirect",
        component: () => import("pages/main/RedirectPg.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        component: () => import("pages/main/ProfilePg.vue"),
        meta: { requiresAuth: true },
      },
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
    component: () => import("layouts/AdminLy.vue"),
    children: [
      { path: "", component: () => import("pages/admin/HomePg.vue") },
      { path: "users", component: () => import("pages/users/UsersPg.vue") },
      {
        path: "add-user",
        component: () => import("pages/users/AddUserPg.vue"),
      },
      {
        path: "edit-user",
        component: () => import("pages/users/EditUserPg.vue"),
      },
      {
        path: "add-type-user",
        component: () => import("pages/admin/AddTypeUserPg.vue"),
      },
      { path: "upload", component: () => import("pages/admin/UploadPg.vue") },
      {
        path: "add-point",
        component: () => import("pages/points/AddPointPg.vue"),
      },
      {
        path: "articles",
        component: () => import("pages/articles/ArticlesPg.vue"),
      },
      {
        path: "add-article",
        component: () => import("pages/articles/AddArticlePg.vue"),
      },
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
