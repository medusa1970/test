<template>
  <div class="row q-pa-md justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <h6 class="q-my-md">Agregar artículo</h6>
        <q-input
          filled
          v-model="name"
          label="Nombre *"
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
          hint="Mínimo 3, Máximo 5 caracteres"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
            (val) => val.length < 6 || 'Nombre(s), Máximo 30 caracteres',
          ]"
        />
        <q-input
          filled
          v-model="description"
          label="Descripción *"
          hint="Mínimo 3, Máximo 50 caracteres"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
            (val) => val.length < 51 || 'Nombre(s), Máximo 30 caracteres',
          ]"
        />
        <q-input
          filled
          v-model="date"
          mask="date"
          :rules="['date']"
          label="Fecha de expiración *"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="q-gutter-sm">
          <q-radio v-model="state" val="pending" label="Pendiente" />
          <q-radio v-model="state" val="active" label="Activo" />
          <q-radio v-model="state" val="inactive" label="Inactivo" />
        </div>
        <q-separator inset />
        <Unit v-model="unit" />
        <Providers v-model="provider" />
        <q-separator inset />

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
import { useAuthStore } from "stores/auth-store";
import Unit from "components/articles/UnitComp.vue";
import Providers from "components/articles/ProvidersComp.vue";
import { api } from "boot/axios";

export default {
  name: "AddUserComp",
  components: {
    Unit,
    Providers,
  },
  props: {
    title: {
      type: String,
      default: "Agregar usuario",
    },
  },
  data() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();
    const first_name = ref("");
    const last_name = ref("");
    const doc_id = ref("");
    const phone = ref("");
    const address = ref("");
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const typeUser = ref("");

    return {
      date: ref(Date.now()),
      state: ref("pending"),
      model: ref(null),
      options: [
        { value: "production", label: "Producción" },
        { value: "point", label: "Punto Sii-Pi" },
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuario Sii-pi" },
      ],
      first_name,
      last_name,
      doc_id,
      phone,
      address,
      email,
      username,
      password,
      isPwd: ref(true),
      authStore,
      router,
      $q,
      typeUser,
      async onSubmit() {
        try {
          const { data } = await api.post("/api/auth/signup", {
            first_name: first_name.value,
            last_name: last_name.value,
            doc_id: doc_id.value,
            phone: phone.value,
            address: address.value,
            email: email.value,
            username: username.value,
            password: password.value,
          });
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
        email.value = "";
        username.value = "";
        password.value = "";
      },
    };
  },
};
</script>
