<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <q-input
          filled
          v-model="first_name"
          label="Nombre completo *"
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
          v-model="last_name"
          label="Apellido completo *"
          hint="Mínimo 3, Máximo 30 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 2) || 'Mínimo 6 caracteres',
            (val) => val.length < 31 || 'Máximo 30 caracteres',
          ]"
        />
        <q-input
          filled
          v-model="doc_id"
          label="Documento de identificación *"
          hint="Mínimo 5, Máximo 12 caracteres"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
            (val) => val.length < 13 || 'Máximo 12 caracteres',
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
      first_name: ref(""),
      last_name: ref(""),
      doc_id: ref(""),
      phone: ref(""),
      address: ref(""),
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
