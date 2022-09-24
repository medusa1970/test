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
        v-if="flagPoint"
        v-model="point"
        v-bind:model="'point'"
        v-bind:label="'Punto de trabajo'"
        v-bind:noData="'Sin datos, agregue uno'"
        v-bind:Icon="'storefront'"
        v-bind:data="userStore.Points"
        @myDialog="addPoint = true"
      />
      <seladdSin
        v-if="flagArea"
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
        @myDialog="addPosition = true"
      />

      <q-card v-if="position">
        <q-card-section class="bg-grey-7 q-pa-xs">
          <seladdMul
            v-model="access"
            v-bind:model="'access'"
            v-bind:label="'Permisos / Accesos'"
            v-bind:noData="'Sin datos, agregue uno'"
            v-bind:Icon="'mediation'"
            v-bind:data="userStore.Access"
            @myDialog="addAccess = true"
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="bg-grey-3 q-pa-xs">
          <div v-for="item in access" :key="item">
            <seladdMul
              v-model="ruta"
              v-bind:model="'routes'"
              v-bind:label="item.label"
              v-bind:noData="'Sin datos, agregue uno'"
              v-bind:Icon="'turn_right'"
              @myDialog="myFunction"
            />
          </div>
        </q-card-section>
      </q-card>
      <div>
        <q-btn label="Guardar" type="submit" color="orange" />
        <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
      </div>
    </div>
  </div>

  <!-- Roles:
  <pre>{{ userStore.Roles }}</pre>
  <br />
  <br /> -->
  {{ routes }} <br />
  Access: {{ userStore.Access }} <br /><br />
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
    v-model="addPosition"
    @cancelEvent="addPosition = 'false'"
    @add-position="addPositionFn"
  />
  <dialog-add-access
    v-model="addAccess"
    @cancelEvent="addAccess = 'false'"
    @add-access="addAccessFn"
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
import DialogAddArea from "src/components/users/DialogAddArea.vue";
import DialogAddPosition from "src/components/users/DialogAddPosition.vue";
import DialogAddAccess from "src/components/users/DialogAddAccess.vue";

export default {
  name: "UserRoleAdd",
  components: {
    seladdSin,
    seladdMul,
    DialogAddType,
    DialogAddPoint,
    DialogAddArea,
    DialogAddPosition,
    DialogAddAccess,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const userStore = useUserStore();
    const addType = ref(false);
    const addPoint = ref(false);
    const addArea = ref(false);
    const addPosition = ref(false);
    const addAccess = ref(false);
    const position = ref("");
    const type = ref("");
    const point = ref("");
    const area = ref("");
    const access = ref([]);
    const flagPoint = ref(false);
    const flagArea = ref(false);
    const routes = ref([]);

    watch(type, (data) => {
      userStore.selectAreas(data.value); //captura id del tipo de usuario
      area.value = "";
      point.value = "";
      position.value = "";
      access.value = [];
      if (data.label === "punto de venta") {
        flagPoint.value = true;
        flagArea.value = false;
      } else {
        flagPoint.value = false;
        flagArea.value = true;
      }
    });

    watch(point, (data) => {
      if (data) {
        flagArea.value = true;
      }
    });

    watch(area, (data) => {
      userStore.selectPositionsAccess(data.value); //captura id del tipo de usuario
      position.value = "";
      access.value = [];
    });

    watch(access, (data) => {
      routes.value = userStore.Access.filter((item) => item.value.includes(data)); /// quede aquiiiiii
      console.log("routes", routes.value);
    });

    return {
      router,
      $q,
      userStore,
      addType,
      addPoint,
      addArea,
      addAccess,
      addPosition,
      position,
      type,
      point,
      area,
      access,
      flagPoint,
      flagArea,
      routes,
      modelMultiple: ref([]),

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

      addAreaFn(data) {
        userStore.addArea(
          data.name,
          data.abbreviation,
          data.description,
          data.icon,
          type.value
        );
        addArea.value = false;
      },

      addPointFn(data) {
        userStore.addPoint(data.name, data.abbreviation, data.address, data.phone);
        addPoint.value = false;
      },

      addPositionFn(data) {
        userStore.addPosition(
          data.name,
          data.abbreviation,
          data.description,
          data.icon,
          type.value,
          area.value
        );
        addPosition.value = false;
      },

      addAccessFn(data) {
        userStore.addAccess(
          data.name,
          data.abbreviation,
          data.description,
          data.icon,
          type.value,
          area.value
        );
        addAccess.value = false;
      },
    };
  },
};
</script>
