<template>
  <div class="row q-pa-md justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <h6 class="q-my-md">{{ title }}</h6>
        <selAdd
          v-model="typeUser"
          v-bind:model="'typeUser'"
          v-bind:label="'Tipo de usuario'"
          v-bind:noData="'Sin tipos de usuario, agregue uno'"
          v-bind:Icon="'people_alt'"
          v-bind:data="
            userStore.TypeUser.map((item) => ({
              label: item.name,
              value: item._id,
            }))
          "
          @myDialog="myFunction"
        />
        <selAdd
          v-model="Points"
          v-bind:model="'Points'"
          v-bind:label="'Seleccione Punto Sii-Pi'"
          v-bind:noData="'Sin datos, agregue uno'"
          v-bind:Icon="'storefront'"
          v-bind:data="
            userStore.Points.map((item) => ({
              label: item.name,
              value: item._id,
            }))
          "
          @myDialog="myFunction"
        />

        <q-input
          filled
          v-model="first_name"
          label="Nombre completo *"
          hint="Mínimo 3, Máximo 30 caracteres"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
            (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
          ]"
        />
        <q-input
          filled
          v-model="last_name"
          label="Apellido completo *"
          hint="Mínimo 3, Máximo 30 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 2) || 'Mínimo 6 caracteres',
            (val) => val.length < 31 || 'Máximo 30 caracteres',
          ]"
        />
        <q-input
          filled
          v-model="doc_id"
          label="Documento de identificación *"
          hint="Mínimo 5, Máximo 12 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
            (val) => val.length < 13 || 'Máximo 12 caracteres',
          ]"
        />
        <q-input
          filled
          type="number"
          v-model="phone"
          label="Numero de teléfono *"
          hint="Mínimo 7, Máximo 8 dígitos"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Ingrese un número de teléfono',
            (val) =>
              (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
          ]"
        />
        <q-input
          filled
          v-model="address"
          label="Dirección *"
          hint="Mínimo 5, Máximo 50 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
            (val) => val.length < 51 || 'Máximo 50 caracteres',
          ]"
        />
        <q-input
          filled
          v-model="email"
          type="email"
          label="Tu email *"
          hint="Mínimo 5, Máximo 30 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
            (val) => val.length < 31 || 'Máximo 50 caracteres',
          ]"
        />

        <q-input
          filled
          v-model="username"
          label="Nombre de usuario *"
          hint="Mínimo 5, Máximo 20 caracteres"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 4) ||
              'Ingresa tu usuario o email, Mínimo 5 caracteres',
            (val) =>
              val.length < 21 ||
              'Ingresa tu usuario o email, Máximo 20 caracteres',
          ]"
        />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Mínimo 6, Máximo 20 caracteres"
          label="Password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Mínimo 6 caracteres',
            (val) => val.length < 21 || 'Máximo 20 caracteres',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn label="Agregar" type="submit" color="amber-10" />
          <q-btn label="Reset" type="reset" color="black" class="q-ml-sm" />
        </div>
      </q-form>
      <q-separator class="q-my-lg" />
      <q-btn
        to="/signin"
        icon="person"
        flat
        label="Login"
        class="col-4 q-mt-xs"
      />
      <q-btn to="/" icon="close" flat label="Cancelar" class="col-4 q-my-md" />
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth-store";
import { useUserStore } from "stores/user-store";

import selAdd from "src/components/users/seladdSin.vue";
import { api } from "boot/axios";

export default {
  name: "AddUser",
  components: {
    selAdd,
  },
  props: {
    title: {
      type: String,
      default: "Agregar usuario",
    },
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const first_name = ref("");
    const last_name = ref("");
    const doc_id = ref("");
    const phone = ref("");
    const address = ref("");
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const typeUser = ref("jaime");

    return {
      first_name,
      last_name,
      doc_id,
      phone,
      address,
      email,
      username,
      password,
      isPwd: ref(true),
      authStore,
      userStore,
      router,
      $q,
      typeUser,
      Points: ref(""),

      async onSubmit() {
        try {
          const { data } = await api.post("/api/auth/signup", {
            first_name: first_name.value,
            last_name: last_name.value,
            doc_id: doc_id.value,
            phone: phone.value,
            address: address.value,
            email: email.value,
            username: username.value,
            password: password.value,
          });
          $q.dialog({
            title: "OK",
            message: "Te has registrado correctamente",
          }).onOk(() => {
            router.push("/");
          });
        } catch (error) {
          $q.dialog({
            title: "ERROR",
            message: error.message,
          }).onOk(() => {
            router.push("/signup");
          });
        }
      },

      onReset() {
        first_name.value = "";
        last_name.value = "";
        doc_id.value = "";
        phone.value = "";
        address.value = "";
        email.value = "";
        username.value = "";
        password.value = "";
      },

      myFunction(data) {
        console.log(data);
      },
    };
  },
};
</script>
