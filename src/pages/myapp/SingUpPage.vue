<template>
  <div class="row justify-center">
    <div class="col-xs-8 col-sm-5 col-md-4 col-lg-3 col-xl-2">
      <h6>Datos de Acceso</h6>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Nombre completo *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingreser un usuario o email',
          ]"
        />
        <q-input
          filled
          v-model="phone"
          label="Ingresa tu numero de telefono *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingreser un usuario o email',
          ]"
        />
        <q-input
          filled
          v-model="email"
          label="Pon tu email *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingreser un usuario o email',
          ]"
        />
        <q-input
          filled
          v-model="username"
          label="Ingresa tu usuario sii-pi *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingreser un usuario o email',
          ]"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Ingresa tu password siipi *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingreser un usuario o email',
          ]"
        />

        <div>
          <q-btn label="Ingresar" type="submit" color="positive" />
          <q-btn label="Reset" type="reset" outlined class="q-ml-sm" />
        </div>
      </q-form>
      <q-separator class="q-my-md" />
      <q-btn icon="key" flat label="Login" no-caps class="" to="/myapp" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AdminAuthLy",
  setup() {
    const $q = useQuasar();
    const email = ref(null);
    const router = useRouter();

    return {
      email,
      onSubmit() {
        console.log("submit");
        router.push("/myapp/change");
      },

      onReset() {
        console.log("reset");
        email.value = null;
      },
    };
  },
});
</script>
