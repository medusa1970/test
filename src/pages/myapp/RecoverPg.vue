<template>
  <div class="row q-pa-md justify-center">
    <div class="col-4">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <h6 class="q-mb-sm">Datos de acceso</h6>
        <q-input
          filled
          v-model="email"
          label="Ingresa tu email *"
          hint="Tu email Sii-Pi"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingresa tu usuario o email',
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
      <q-separator class="q-mt-lg" />
      <q-btn to="/myapp" icon="key" flat label="Login" class="col-4 q-my-md" />
      <q-btn
        to="/myapp/register"
        icon="person"
        flat
        label="Registrate"
        class="col-4 q-my-md"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default {
  data() {
    const $q = useQuasar();
    const router = useRouter();

    return {
      email: ref(""),
      onSubmit() {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "email",
          message: "Tu codigo fue enviado con exito a tu email",
        });
        router.push("/myapp/change");
      },

      onReset() {
        email.value = null;
      },
    };
  },
};
</script>
