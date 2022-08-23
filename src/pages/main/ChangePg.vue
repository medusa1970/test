<template>
  <div class="row q-pa-md justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-3 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <h6 class="q-my-md">Datos de acceso</h6>
        <q-input
          filled
          v-model="recovery_code"
          label="Codigo de recuperacion *"
          hint="Fue enviado a tu email"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length == 8) ||
              'Ingresa un código de recuperacion valido',
          ]"
        />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Minimo 6, Maximo 20 caracteres"
          label="Nuevo password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Minimo 6 caracteres',
            (val) => val.length < 21 || 'Maximo 20 caracteres',
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
          type="password"
          filled
          hint="Minimo 6, Maximo 20 caracteres"
          label="Repite el password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Minimo 6 caracteres',
            (val) => val.length < 21 || 'Maximo 20 caracteres',
            (val) => val == password || 'Los passwords no coinciden',
          ]"
        >
        </q-input>

        <div>
          <q-btn label="Submit" type="submit" color="amber-10" />
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "boot/axios";

export default {
  data() {
    const $q = useQuasar();
    const router = useRouter();
    const recovery_code = ref("");
    const password = ref("");
    const match_password = ref("");

    return {
      recovery_code,
      password,
      match_password,
      isPwd: ref(true),
      async onSubmit() {
        const { data } = await api.post("/api/auth/change", {
          recovery_code: recovery_code.value,
          password: password.value,
          match_password: match_password.value,
          recover_token: localStorage.getItem("recover_token"),
        });
        localStorage.removeItem("recover_token");
        if (data.error === null) {
          $q.dialog({
            title: "OK",
            message: data.message,
          }).onOk(() => {
            router.push("/signin");
          });
        } else {
          $q.dialog({
            title: "Error",
            message: data.message,
            color: "negative",
            buttons: ["Ok"],
          });
        }
      },

      onReset() {
        recovery_code.value = "";
        password.value = "";
        match_password.value = "";
      },
    };
  },
};
</script>
