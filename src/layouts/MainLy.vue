<template>
  <q-layout>
    <q-header elevated class="bg-blue-grey-2">
      <!-- <q-img src="../assets/image/fondo.jpg" class="absolute-bottom" /> -->
      <q-toolbar class="row">
        <img
          src="../assets/image/logo-sii-pi-verde.svg"
          class="col-md-1 col-xs-3 q-my-md"
        />
        <div class="q-gutter-md q-mt-md q-ml-xl">
          <q-btn
            flat
            color="black"
            icon="restaurant"
            label="Menu"
            @click="dialog = true"
          />
          <q-btn
            flat
            color="black"
            icon="celebration"
            label="Promociones"
            @click="dialog = true"
          />
          <q-btn
            flat
            color="black"
            icon="las la-store-alt"
            label="Productos"
            @click="dialog = true"
          />
          <q-btn
            flat
            color="black"
            icon="location_on"
            label="Encuentranos"
            @click="dialog = true"
          />
          <q-btn
            flat
            color="black"
            icon="question_answer"
            label="Sii-pi"
            @click="dialog = true"
          />
        </div>

        <q-toolbar-title />

        <div v-if="!authStore.user" class="q-gutter-sm q-mt-md">
          <q-fab
            padding="xs"
            icon="account_circle"
            v-model="fab1"
            vertical-actions-align="right"
            color="blue-grey-9"
            glossy
            direction="down"
          >
            <q-fab-action
              square
              color="blue-grey-8"
              @click="onClick"
              icon="login"
              label="Ingresar"
              label-position="left"
              to="/signin"
            />
            <q-fab-action
              square
              color="blue-grey-8"
              @click="authStore.logout()"
              to="signup"
              icon="assignment"
              label="Registrarme"
              label-position="left"
            />
          </q-fab>
        </div>

        <div v-else class="q-gutter-sm q-mt-md">
          <q-fab
            padding="xs"
            icon="account_circle"
            v-model="fab2"
            vertical-actions-align="right"
            color="blue-grey-9"
            glossy
            :label="authStore.user.user.username"
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
              @click="signOut"
              icon="logout"
              label="Salir"
              label-position="left"
            />
          </q-fab>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
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
import { useAuthStore } from "stores/AuthStore";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

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

      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
        { label: "Three", value: "three" },
      ],
      signOut() {
        authStore.logout();
        $q.localStorage.remove("signin");
        router.push("/signin");
      },
    };
  },
};
</script>
