<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2 q-gutter-y-md q-mt-xs">
      <h6 class="q-ma-none">
        {{ userStore.newUser.first_name }} {{ userStore.newUser.last_name }}
      </h6>
      <seladdSin
        v-model="type"
        v-bind:model="'type'"
        v-bind:label="'Tipo de usuario'"
        v-bind:noData="'Sin datos, agregue uno'"
        v-bind:Icon="'supervisor_account'"
        v-bind:data="userStore.Type"
        @myDialog="addType = true"
      />
      <seladdSin
        v-if="type.label === 'colaborador de punto'"
        v-model="point"
        v-bind:model="'point'"
        v-bind:label="'Punto de trabajo'"
        v-bind:noData="'Sin datos, agregue uno'"
        v-bind:Icon="'storefront'"
        v-bind:data="userStore.Points"
        @myDialog="addPoint = true"
      />
      <seladdSin
        v-if="type"
        v-model="area"
        v-bind:model="'area'"
        v-bind:label="'Area de trabajo'"
        v-bind:noData="'Sin datos, agregue uno'"
        v-bind:Icon="'dashboard'"
        v-bind:data="userStore.Area"
        @myDialog="addArea = true"
      />

      <seladdSin
        v-if="area"
        v-model="position"
        v-bind:model="'position'"
        v-bind:label="'Cargo'"
        v-bind:noData="'Sin datos, agregue uno'"
        v-bind:Icon="'groups'"
        v-bind:data="userStore.Position"
        @myDialog="addArea = true"
      />

      <q-card v-if="area">
        <q-card-section class="bg-grey-7 q-pa-xs">
          <seladdMul
            v-model="access"
            v-bind:model="'access'"
            v-bind:label="'Accesos'"
            v-bind:noData="'Sin datos, agregue uno'"
            v-bind:Icon="'mediation'"
            v-bind:data="userStore.Access"
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
  Tipo: {{ type }} <br />
  Punto: {{ point }} <br />
  Area: {{ area }} <br />
  Cargo: {{ position }} <br />
  Accesos: {{ access }} <br />
  <br />
  <br />
  Areas: {{ userStore.AreaTmp }}
  <br />
  Cargos: {{ userStore.PositionTmp }}
  <br />
  Accesos: {{ userStore.AccessTmp }}

  <dialog-add-type
    v-model="addType"
    @cancelEvent="addType = 'false'"
    @add-type="addTypeFn"
  />
  <dialog-add-point
    v-model="addPoint"
    @cancelEvent="addPoint = 'false'"
    @add-point="addPointFn"
  />
  <dialog-add-area
    v-model="addArea"
    @cancelEvent="addArea = 'false'"
    @add-area="addAreaFn"
  />
  <dialog-add-position
    v-model="addPos"
    @cancelEvent="addPos = 'false'"
    @add-position="addPosition"
  />
</template>
<script>
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import seladdSin from "src/components/users/seladdSin.vue";
import seladdMul from "src/components/users/seladdMul.vue";
import { useUserStore } from "stores/user-store";
import DialogAddType from "src/components/users/DialogAddType.vue";
import DialogAddPoint from "src/components/users/DialogAddPoint.vue";
import DialogAddPosition from "src/components/users/DialogAddPosition.vue";
import DialogAddArea from "src/components/users/DialogAddArea.vue";

export default {
  name: "UserRoleAdd",
  components: {
    seladdSin,
    seladdMul,
    DialogAddType,
    DialogAddPoint,
    DialogAddPosition,
    DialogAddArea,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const userStore = useUserStore();
    const addType = ref(false);
    const addPoint = ref(false);
    const addPos = ref(false);
    const addArea = ref(false);
    const position = ref("");
    const type = ref("");
    const point = ref("");
    const area = ref("");
    const access = ref(null);

    watch(type, (data) => {
      userStore.selectAreas(data.value); //captura id del tipo de usuario
    });

    watch(area, (data) => {
      userStore.selectPositionsAccess(data.value); //captura id del tipo de usuario
    });

    return {
      router,
      $q,
      userStore,
      addType,
      addPoint,
      addPos,
      addArea,
      position,
      type,
      point,
      area,
      access,

      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
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

      addTypeFn(data) {
        userStore.addType(data.name, data.abbreviation, data.description, data.icon);
        addType.value = false;
      },

      addPointFn(data) {
        userStore.addPoint(data.name, data.abbreviation, data.address, data.phone);
        addPoint.value = false;
      },

      addPosition(data) {
        userStore.addPosition(data.name, data.abbreviation, data.description);
        addPos.value = false;
      },

      addAreaFn(data) {
        console.log(data);
      },
    };
  },
};
</script>
