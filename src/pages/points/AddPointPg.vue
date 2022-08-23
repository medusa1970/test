<template>
  <div class="row q-pa-md justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-3 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <h6 class="q-my-md">Agregar nuevo punto</h6>
        <q-input
          filled
          v-model="name"
          label="Nombre del punto *"
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
          v-model="abbreviation"
          label="Abreviacion *"
          hint="Mínimo 3, Máximo 4 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 2) || 'Mínimo 6 caracteres',
            (val) => val.length < 5 || 'Máximo 30 caracteres',
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "boot/axios";

export default {
  data() {
    const $q = useQuasar();
    const router = useRouter();
    const name = ref("");
    const abbreviation = ref("");
    const address = ref("");
    const phone = ref("");

    return {
      name,
      abbreviation,
      address,
      phone,
      router,
      async onSubmit() {
        try {
          const { data } = await api.post("/api/point", {
            name: name.value,
            abbreviation: abbreviation.value,
            address: address.value,
            phone: phone.value,
          });
          $q.dialog({
            title: "OK",
            message: "Se registró correctamente",
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
        name.value = "";
        abbreviation.value = "";
        address.value = "";
        phone.value = "";
      },
    };
  },
};
</script>
