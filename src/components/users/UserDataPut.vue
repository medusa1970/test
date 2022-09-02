<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <q-input
          filled
          disable
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
          disable
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
          disable
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
        <q-separator />

        <!-- input disabled -->

        <q-input
          filled
          disable
          v-model="email"
          type="email"
          label="Tu email *"
          hint="Mínimo 5, Máximo 50 caracteres"
          lazy-rules
          :rules="[
            (val) => val.length > 5 || 'Mínimo 6 caracteres',
            (val) => val.length < 51 || 'Máximo 50 caracteres',
            (val) => isValidEmail(val) || 'Email inválido',
            (val) => emailValid(val) || 'Email ya registrado',
          ]"
        />

        <q-input
          filled
          disable
          v-model="username"
          label="Nombre de usuario *"
          hint="Mínimo 5, Máximo 20 caracteres"
          lazy-rules
          :rules="[
            (val) => usernameValid(val) || 'Usuario ya registrado',
            (val) => val.length > 4 || 'Mínimo 5 caracteres',
            (val) => val.length < 21 || 'Máximo 20 caracteres',
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

    const first_name = ref(userStore.newUser.first_name) || ref("");
    const last_name = ref(userStore.newUser.last_name) || ref("");
    const doc_id = ref(userStore.newUser.doc_id) || ref("");
    const phone = ref(userStore.newUser.phone) || ref("");
    const address = ref(userStore.newUser.address) || ref("");
    const email = ref(userStore.newUser.email) || ref("");
    const username = ref(userStore.newUser.username) || ref("");
    const password = ref("");
    const match_password = ref("");

    return {
      first_name,
      last_name,
      doc_id,
      phone,
      address,
      email,
      username,
      password,
      match_password,
      userStore,
      router,
      $q,
      isPwd: ref(true),

      isValidEmail: (val) => {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val);
      },

      emailValid: (val) => {
        const result = userStore.Users.filter((user) => user.email == val).length;
        return result == 0 || userStore.newUser.email == val;
      },

      usernameValid: (val) => {
        const result = userStore.Users.filter((user) => user.username == val).length;
        return result == 0 || userStore.newUser.username == val;
      },

      async onSubmit() {
        try {
          const dataForm = {
            first_name: first_name.value,
            last_name: last_name.value,
            doc_id: doc_id.value,
            phone: phone.value,
            address: address.value,
            email: email.value,
            username: username.value,
            password: password.value,
          };
          // verificar si array newUser esta vacio
          if (Object.keys(userStore.newUser).length === 0) {
            const { data } = await api.post("/api/user", dataForm);
            console.log(data);
            $q.notify({
              message: `${first_name.value} ${last_name.value} se agrego correctamente`,
              color: "positive",
              position: "top",
            });
            userStore.addUser(data.user);
          } else {
            console.log("actualizando");
            const { data } = await api.put(
              `/api/user/${userStore.newUser._id}`,
              dataForm
            );
            console.log(data);
            $q.notify({
              message: `${first_name.value} ${last_name.value} se actualizo correctamente`,
              color: "positive",
              position: "top",
            });
            userStore.addUser(data.user);
          }
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
