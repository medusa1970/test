<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
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
        <q-separator />
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

        <q-input
          v-model="match_password"
          filled
          hint="Mínimo 6, Máximo 20 caracteres"
          label="Repite password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Mínimo 6 caracteres',
            (val) => val.length < 21 || 'Máximo 20 caracteres',
          ]"
        >
        </q-input>

        <div>
          <q-btn label="Agregar" type="submit" color="amber-10" />
          <q-btn label="Reset" type="reset" color="black" class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user-store";
import { api } from "boot/axios";

export default {
  name: "AddUser",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const userStore = useUserStore();

    return {
      email: ref(""),
      username: ref(""),
      password: ref(""),
      match_password: ref(""),
      router,
      $q,
      userStore,

      async onSubmit() {
        try {
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
      },

      myFunction(data) {
        console.log(data);
      },
    };
  },
};
</script>
