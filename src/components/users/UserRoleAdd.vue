<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2 q-gutter-y-md q-mt-xs">
      <h6 class="q-ma-none">
        {{ userStore.newUser.first_name }} {{ userStore.newUser.last_name }}
      </h6>
      {{ position }}
      <seladdSin
        v-model="position"
        v-bind:model="'name'"
        v-bind:label="'Cargo del colaborador'"
        v-bind:noData="'Sin datos, agregue uno'"
        v-bind:Icon="'assignment_ind'"
        v-bind:data="
          userStore.positions.map((item) => ({
            label: item.name,
            value: item._id,
          }))
        "
        @myDialog="myFunction"
      />
      <seladdSin
        v-model="area"
        v-bind:model="'area'"
        v-bind:label="'Area de trabajo'"
        v-bind:noData="'Sin datos, agregue uno'"
        v-bind:Icon="'dashboard'"
        @myDialog="myFunction"
      />
      <q-card>
        <q-card-section class="bg-grey-7 q-pa-xs">
          <seladdMul
            v-model="Accesos"
            v-bind:model="'Access'"
            v-bind:label="'Accesos'"
            v-bind:noData="'Sin datos, agregue uno'"
            v-bind:Icon="'mediation'"
            @myDialog="myFunction"
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="bg-grey-3 q-pa-xs">
          <seladdMul
            v-model="ruta"
            v-bind:model="'routes'"
            v-bind:label="'Rutas'"
            v-bind:noData="'Sin datos, agregue uno'"
            v-bind:Icon="'turn_right'"
            @myDialog="myFunction"
          />
        </q-card-section>
        <q-card-section class="bg-grey-3 q-pa-xs">
          <seladdMul
            v-model="ruta"
            v-bind:model="'routes'"
            v-bind:label="'Rutas'"
            v-bind:noData="'Sin datos, agregue uno'"
            v-bind:Icon="'turn_right'"
            @myDialog="myFunction"
          />
        </q-card-section>
      </q-card>
      <div>
        <q-btn label="Guardar" type="submit" color="orange" />
        <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
      </div>
    </div>
  </div>
  <dialog-add-position
    v-model="addPos"
    @cancelEvent="addPos = 'false'"
    @add-position="addPosition"
  />
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import seladdSin from "src/components/users/seladdSin.vue";
import seladdMul from "src/components/users/seladdMul.vue";
import { useUserStore } from "stores/user-store";
import DialogAddPosition from "src/components/users/DialogAddPosition.vue";

export default {
  name: "UserRoleAdd",
  components: {
    seladdSin,
    seladdMul,
    DialogAddPosition,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const userStore = useUserStore();
    const addPos = ref(false);
    const position = ref("");
    return {
      router,
      $q,
      userStore,
      addPos,
      position,

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
        addPos.value = true;
      },

      addPosition(data) {
        userStore.addPosition(data.name, data.abbreviation, data.description);
        addPos.value = false;
      },
    };
  },
};
</script>
