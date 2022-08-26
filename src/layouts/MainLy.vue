<template>
  <q-layout container style="height: 100vh" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-blue-grey-2">
      <q-toolbar class="justify-between">
        <div class="row items-center">
          <div>
            <q-btn
              glossy
              @click="drawer = !drawer"
              round
              dense
              icon="menu"
              color="blue-grey-9"
              class="q-mr-sm"
            />
          </div>
          <img
            src="../assets/image/logo-sii-pi-verde.svg"
            style="height: 6vh"
            class="q-my-xs"
          />
        </div>
        <div class="row">
          <div v-if="!authStore.loggedIn" class="q-gutter-sm">
            <q-fab
              padding="xs"
              icon="manage_accounts"
              v-model="fab1"
              vertical-actions-align="right"
              color="blue-grey-9"
              glossy
              direction="down"
            >
              <q-fab-action
                square
                color="blue-grey-8"
                icon="login"
                label="Ingresar"
                label-position="left"
                to="/signin"
              />
              <q-fab-action
                square
                color="blue-grey-8"
                to="signup"
                icon="assignment"
                label="Registrarme"
                label-position="left"
              />
            </q-fab>
          </div>

          <div v-else class="q-gutter-sm">
            <q-fab
              padding="xs"
              icon="manage_accounts"
              v-model="fab2"
              vertical-actions-align="right"
              color="blue-grey-9"
              glossy
              :label="authStore.loggedIn.username"
              direction="down"
            >
              <q-fab-action
                square
                color="blue-grey-8"
                @click="onClick"
                icon="manage_accounts"
                label="Mi Perfil"
                label-position="left"
                to="profile"
              />
              <q-fab-action
                square
                color="blue-grey-8"
                @click="logout"
                icon="logout"
                label="Salir"
                label-position="left"
              />
            </q-fab>
          </div>
        </div>
      </q-toolbar>
      <q-tabs v-model="tab" inline-label class="bg-orange text-white shadow-2">
        <q-tab
          v-for="(menuItem, index) in menuList"
          :key="index"
          :icon="menuItem.icon"
          :label="menuItem.label"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="250"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 400px" class="bg-blue-grey-2">
      <q-card-section class="items-center row">
        <q-avatar icon="engineering" color="amber-9" text-color="white" />
        <h5 class="q-my-none q-ml-md">En construcción...</h5>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <img src="../assets/image/sii-pi-work.svg" class="col-md-1 col-xs-3" />
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions class="justify-center">
        <q-btn
          color="blue-grey-8"
          label="Cancelar"
          v-close-popup="!cancelEnabled"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "stores/auth-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const menuList = [
  {
    icon: "restaurant",
    label: "Menu",
    separator: true,
  },
  {
    icon: "celebration",
    label: "Promociones",
    separator: false,
  },
  {
    icon: "las la-store-alt",
    label: "Productos",
    separator: true,
  },
  {
    icon: "location_on",
    label: "Encuentranos",
    separator: false,
  },
  {
    icon: "question_answer",
    label: "Sii-pi",
    separator: false,
  },
];
export default {
  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const router = useRouter();
    return {
      authStore,
      model: ref("one"),
      dialog: ref(false),
      fab1: ref(false),
      fab2: ref(false),
      drawer: ref(false),
      menuList,

      logout() {
        $q.localStorage.remove("loggedIn");
        authStore.logout();
        router.push("/signin");
      },
    };
  },
};
</script>
