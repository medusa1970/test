<template>
  <div class="row justify-center">
    <div class="col-xs-8 col-sm-5 col-md-4 col-lg-3 col-xl-2">
      <h6>Datos de Acceso</h6>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Tu usuario o email *"
          hint="Tu usuario o email de Sii-Pi"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingreser un usuario o email',
          ]"
        />

        <q-input
          v-model="password"
          label="Password *"
          filled
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingrese su password']"
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
          <q-btn label="Ingresar" type="submit" color="positive" />
          <q-btn label="Reset" type="reset" outlined class="q-ml-sm" />
        </div>
      </q-form>
      <q-separator class="q-my-md" />
      <q-btn
        icon="key"
        flat
        label="Olvidaste tu contraseña"
        no-caps
        class=""
        to="/myapp/recover"
      />
      <q-btn
        icon="key"
        flat
        label="Registrate"
        no-caps
        class=""
        to="/myapp/singup"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/AuthStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AdminAuthLy",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();
    const username = ref(null);
    const password = ref(null);

    return {
      username,
      password,
      isPwd: ref(true),
      authStore,
      onSubmit() {
        if (username.value === "medusa" && password.value === "meduse") {
          $q.notify({
            message: "Usted ingreso correctamente",
            icon: "thumb_up_alt",
          });
          router.push("/protected");
        } else {
          $q.notify({
            message: "Usted ingreso incorrectamente",
            icon: "thumb_down_alt",
            color: "negative",
          });
        }
      },

      onReset() {
        console.log("reset");
        username.value = null;
        password.value = null;
      },
    };
  },
});
</script>
