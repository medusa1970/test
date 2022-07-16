<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="username"
        label="Tu ususario o email *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Tu password Sii-pi *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Ingrese un password',
          (val) =>
            (val && val.length > 5) ||
            'El password debe tener al menos 6 caracteres',
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
  </div>
  {{ authStore.user }}
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useAuthStore } from "stores/AuthStore";
import { api } from "boot/axios";

export default {
  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const username = ref("jaimewvf@gmail.com");
    const password = ref("meduse");

    return {
      username,
      password,
      authStore,

      async onSubmit() {
        authStore.login(username.value, password.value);
        response = await api.get("https://ipinfo.io/json");
        console.log(response);
        $q.notify({
          color: "secondary",
          textColor: "white",
          icon: "settings",
          message: `Username: ${username.value} - Password: ${password.value}`,
        });
      },

      onReset() {
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>
