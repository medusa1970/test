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
        v-bind:data="userStore.Types"
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
        v-bind:data="userStore.Areas"
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
        <q-card-section
          class="bg-grey-3 q-pa-xs"
          v-for="(item, index) in access"
          :key="index"
        >
          <seladdMul
            v-model="routes[index]"
            v-bind:model="item.value"
            v-bind:label="item.label"
            v-bind:noData="'Sin datos, agregue uno'"
            v-bind:Icon="'turn_right'"
            v-bind:data="
              item.routes.map((r) => ({
                label: r.name,
                value: r._id,
                icon: 'turn_right',
              }))
            "
            @myDialog="addRouteSel"
          />
        </q-card-section>
      </q-card>
      <div>
        <q-btn label="Guardar" type="submit" color="orange" />
        <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
      </div>
    </div>
  </div>

<!--
  <br />
  type: {{ type }}<br />
  point: {{ point }}<br />
  area: {{ area }}<br />
  position: {{ position }}<br />
  access: {{ access }}<br />
  routes: {{ routes }}<br />
  <br />
 -->

  <br />
  store rolesUser:
  <pre>{{ userStore.rolesUser }}</pre>
  <br />
  <br />
  roleUser:
  <pre>{{ roleUser }}</pre>
  <br />
  ROLES
  <br />
  <pre>{{ userStore.Roles }}</pre>
  <br />

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
  <dialog-add-route
    v-model="addRoute"
    @cancelEvent="addRoute = 'false'"
    @add-route="addRouteFn"
  />
</template>
<script>
import { ref, watch, onMounted, computed } from "vue";
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
import DialogAddRoute from "src/components/users/DialogAddRoute.vue";

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
    DialogAddRoute,
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
    const addRoute = ref(false);
    const position = ref("");
    const type = ref("");
    const point = ref("");
    const area = ref("");
    const access = ref([]);
    const routes = ref({});
    const flagPoint = ref(false);
    const flagArea = ref(false);
    const routesTmp = ref([]);
    const roleUser = ref({
      type: userStore.rolesUser.type,
      point: userStore.rolesUser.point,
      area: userStore.rolesUser.area,
      position: userStore.rolesUser.position,
      access: userStore.rolesUser.access,
      routes: userStore.rolesUser.routes,
    });
    const idAccess = ref("");

    onMounted(async () => {
      console.log("1userStore.rolesUser.access", userStore.rolesUser.access);
      const dataUser = await userStore.Roles.find(
        (item) => item._id === userStore.rolesUser.type
      );
      type.value = {
        label: dataUser.type.name,
        value: dataUser._id,
        icon: dataUser.type.icon,
      };

      console.log("2userStore.rolesUser.access", userStore.rolesUser.access);
      const dataArea = await dataUser.area.find(
        (item) => item._id === userStore.rolesUser.area
      );
      area.value = {
        label: dataArea.name,
        value: dataArea._id,
        icon: dataArea.icon,
      };

      console.log("3userStore.rolesUser.access", userStore.rolesUser.access);
      const dataPosition = await dataArea.position.find(
        (item) => item._id === userStore.rolesUser.position
      );
      position.value = {
        label: dataPosition.name,
        value: dataPosition._id,
        icon: dataPosition.icon,
      };

      console.log("4userStore.rolesUser.access", userStore.rolesUser.access);
      await dataArea.access.map((item, index) => {
        console.log("dataArea.access", dataArea.access);
        if (userStore.rolesUser.access.indexOf(item._id) !== -1) {
          access.value.push({
            label: item.name,
            value: item._id,
            icon: item.icon,
            routes: item.routes,
          });
          item.routes.map((i) => {
            if (userStore.rolesUser.routes.indexOf(i._id) !== -1) {
              routesTmp.value.push({
                label: i.name,
                value: i._id,
                icon: index,
              });
            }
          });
        }
        routes.value.push(routesTmp.value);
        routesTmp.value = [];
      });
    });

    watch(type, (data) => {
      userStore.selectAreas(data.value); //captura id del tipo de usuario
      area.value = "";
      point.value = "";
      position.value = "";
      access.value = [];
      routes.value = [];

      if (data.label.toLowerCase() === "punto de venta") {
        flagPoint.value = true;
        flagArea.value = false;
      } else {
        flagPoint.value = false;
        flagArea.value = true;
      }
    });

    watch(point, (data) => {
      userStore.selectPoint(data.value); //captura id del punto de venta
      if (data) {
        flagArea.value = true;
      }
    });

    watch(area, (data) => {
      userStore.selectPositionsAccess(data.value); //captura id del area
      position.value = "";
      access.value = [];
      routes.value = [];
    });

    watch(position, (data) => {
      userStore.selectPosition(data.value);
    });

    watch(
      () => access.value,
      (data) => {
        userStore.selectAccess(data);
      },
      { deep: true }
    );

// detect change with $set of routes[]
    watch(
      () => routes.value,
      (data) => {
        userStore.selectRoutes(data);
      },
      { deep: true }
    );

return {
      router,
      $q,
      userStore,
      addType,
      addPoint,
      addArea,
      addPosition,
      addAccess,
      addRoute,
      position,
      type,
      point,
      area,
      access,
      flagPoint,
      flagArea,
      routes,
      idAccess,
      roleUser,

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

      addRouteFn(data) {
        userStore.addRoute(
          data.name,
          data.route,
          data.description,
          type.value,
          area.value,
          idAccess.value
        );
        addRoute.value = false;
        //push in access.routes new route
        const newRoute = {
          name: data.name,
          route: data.route,
          description: data.description,
        };
        access.value.map((item) => {
          if (item.value === idAccess.value) {
            item.routes.push(newRoute);
          }
        });
      },

      addRouteSel(idAcc) {
        idAccess.value = idAcc; //variable que guarda el id del acceso seleccionado
        addRoute.value = true;
      },

    };
  },
};
</script>
