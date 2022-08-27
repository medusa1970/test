<template>
  <div>
    <selAdd
      v-model="typeUser"
      v-bind:model="'typeUser'"
      v-bind:label="'Tipo de usuario'"
      v-bind:noData="'Sin tipos de usuario, agregue uno'"
      v-bind:Icon="'people_alt'"
      @myDialog="myFunction"
    />
  </div>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import selAdd from "components/users/seladdCmp.vue";

export default {
  name: "UserRoleAdd",
  components: {
    selAdd,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    return {
      router,
      $q,

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

      onReset() {},

      myFunction(data) {
        console.log(data);
      },
    };
  },
};
</script>
