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
            (val) => (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
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
            (val) => (val !== null && val !== '') || 'Ingrese un número de teléfono',
            (val) => (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
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
          <q-btn label="Guardar" type="submit" color="orange" />
          <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
        </div>
      </q-form>
      {{ userStore.newUser }}
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
  name: "UserDataAdd",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const userStore = useUserStore();
    const first_name = userStore.newUser.first_name || ref("");
    const last_name = userStore.newUser.last_name || ref("");
    const doc_id = userStore.newUser.doc_id || ref("");
    const phone = userStore.newUser.phone || ref("");
    const address = userStore.newUser.address || ref("");

    return {
      first_name,
      last_name,
      doc_id,
      phone,
      address,
      router,
      $q,
      userStore,

      async onSubmit() {
        try {
          const { data } = await api.post("/api/user", {
            first_name: first_name.value,
            last_name: last_name.value,
            doc_id: doc_id.value,
            phone: phone.value,
            address: address.value,
          });
          userStore.addUser(data.user);
          $q.dialog({
            title: "OK",
            message: `${data.user.first_name} ${data.user.last_name} se agrego correctamente`,
          }).onOk(() => {});
        } catch (error) {
          $q.dialog({
            title: "ERROR",
            message: error.message,
          }).onOk(() => {});
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
