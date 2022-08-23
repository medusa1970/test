<template>
  <div class="row q-pa-md justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-3 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <h6 class="q-my-md">Recuperacion de contraseña</h6>
        <q-input
          filled
          v-model="email"
          type="email"
          label="Email con el que te registraste a Sii-Pi *"
          hint="Mínimo 5, Máximo 30 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
            (val) => val.length < 31 || 'Máximo 50 caracteres',
          ]"
        />

        <div>
          <q-btn label="Enviar" type="submit" color="amber-10" />
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
    const email = ref("");

    return {
      email,
      async onSubmit() {
        try {
          const { data } = await api.post("/api/auth/recover", {
            email: email.value,
          });
          localStorage.setItem("recover_token", data.recover_token);
          $q.dialog({
            title: "OK",
            message: data.message,
          }).onOk(() => {
            router.push("/change");
          });
        } catch (error) {
          $q.dialog({
            title: "ERROR",
            message: data.message,
          }).onOk(() => {
            router.push("/recover");
          });
        }
      },

      onReset() {
        email.value = null;
      },
    };
  },
};
</script>
