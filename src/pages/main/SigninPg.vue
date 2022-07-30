<template>
  <div class="row q-pa-md justify-center">
    <div class="col-3">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <h6 class="q-my-md">Datos de acceso</h6>
        <q-input
          filled
          v-model="username"
          label="Tu usuario o email *"
          hint="Minimo 5, Maximo 30 caracteres"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 4) ||
              'Ingresa tu usuario o email, minimo 6 caracteres',
            (val) =>
              val.length < 31 ||
              'Ingresa tu usuario o email, maximo 50 caracteres',
          ]"
        />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Minimo 6, Maximo 20 caracteres"
          label="Tu password *"
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

        <div>
          <q-btn label="Submit" type="submit" color="amber-10" />
          <q-btn label="Reset" type="reset" color="black" class="q-ml-sm" />
        </div>
      </q-form>
      <q-separator class="q-mt-lg" />
      <q-btn
        to="/myapp/recover"
        icon="key"
        flat
        label="Olvido su password"
        class="col-4 q-my-md"
      />
      <q-btn
        to="/myapp/register"
        icon="person"
        flat
        label="Registrate"
        class="col-4 q-my-md"
      />
    </div>
  </div>
  {{ authStore.user }}
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/AuthStore";

export default {
  data() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");

    return {
      username,
      password,
      isPwd: ref(true),
      authStore,
      async onSubmit() {
        await authStore.signin(username.value, password.value);
        if (authStore.user.error === null) {
          await $q.localStorage.set("signin", authStore.user);
          $q.notify({
            color: "positive",
            textColor: "white",
            message: "Bienvenido",
          });
          router.push("/");
        } else {
          $q.localStorage.remove("signin");
          $q.notify({
            color: "red",
            textColor: "white",
            message: "Datos incorrectos",
          });
        }
      },

      onReset() {
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>
