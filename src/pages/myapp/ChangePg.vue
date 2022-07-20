<template>
  <div class="row q-pa-md justify-center">
    <div class="col-4">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <h6 class="q-mb-sm">Datos de acceso</h6>
        <q-input
          filled
          v-model="codigo"
          label="Ingresa el codigo que fue enviaso a tu email *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingresa tu usuario o email',
          ]"
        />
        <q-input
          filled
          type="password"
          v-model="newPassword"
          label="Ingresa nuevo password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingresa tu nuevo password',
          ]"
        />
        <q-input
          filled
          type="password"
          v-model="matchPassword"
          label="Repite tu password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Repite el password']"
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
      codigo: ref(""),
      newPassword: ref(""),
      matchPassword: ref(""),
      onSubmit() {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "email",
          message: "Tu password fue cambiado con exito",
        });
        router.push("/myapp");
      },

      onReset() {
        email.value = null;
      },
    };
  },
};
</script>
