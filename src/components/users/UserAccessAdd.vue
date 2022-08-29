<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <h6 class="q-ma-none">
        {{ userStore.newUser.first_name }} {{ userStore.newUser.last_name }}
      </h6>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <q-input
          filled
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
        <q-separator />
        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Mínimo 6, Máximo 20 caracteres"
          label="Password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Mínimo 6 caracteres',
            (val) => val.length < 21 || 'Máximo 20 caracteres',
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

        <q-input
          v-model="match_password"
          type="password"
          filled
          hint="Minimo 6, Maximo 20 caracteres"
          label="Repite el password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Minimo 6 caracteres',
            (val) => val.length < 21 || 'Maximo 20 caracteres',
            (val) => val == password || 'Los passwords no coinciden',
          ]"
        >
        </q-input>

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
    const email = ref(userStore.newUser.email) || ref("");
    const username = ref(userStore.newUser.username) || ref("");
    const password = ref("");
    const match_password = ref("");

    return {
      email,
      username,
      password,
      match_password,
      router,
      $q,
      userStore,
      isPwd: ref(true),

      isValidEmail: (val) => {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val);
      },

      emailValid: (val) => {
        const result = userStore.Users.filter((user) => user.email == val).length;
        return result == 0;
      },

      usernameValid: (val) => {
        const result = userStore.Users.filter((user) => user.username == val).length;
        return result == 0;
      },

      async onSubmit() {
        const _id = userStore.newUser._id;
        try {
          //update user
          await api.put(`/api/user/${_id}`, {
            email: email.value,
            username: username.value,
            password: password.value,
          });
          userStore.putUser(email.value, username.value, password.value);
          $q.dialog({
            title: "OK",
            message: "Datos actualizados",
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
    };
  },
};
</script>
