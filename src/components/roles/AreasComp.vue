<template>
  <div class="row">
    <q-btn-dropdown
      class="col-9 q-mr-md"
      split
      color="secondary"
      push
      glossy
      no-caps
      icon="manage_accounts"
      :label="
        roleStore.areaSelected.name
          ? 'Area: ' + roleStore.areaSelected.name
          : 'Seleccione una area'
      "
    >
      <q-list separator>
        <q-item
          v-for="({ name, icon }, index) in roleStore.areas"
          :key="index"
          clickable
          v-close-popup
          @click="onItemClick(roleStore.areas[index])"
        >
          <q-item-section avatar>
            <q-avatar :icon="icon" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ name }}</q-item-label>
            <q-item-label caption>February 22, 2016</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <div class="self-center">
      <q-btn
        round
        color="deep-orange"
        icon="add"
        size="md"
        @click="dialog = true"
      />
    </div>
  </div>

  <!-- separador -->

  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="engineering" color="secondary" text-color="white" />
        <h6 class="q-ml-sm q-my-none">Agregando nueva area de trabajo</h6>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input label="Nueva Area" outlined v-model="newItem"></q-input>
        <q-input label="Icono" outlined v-model="icon"></q-input>
      </q-card-section>

      <q-card-actions class="justify-center">
        <q-btn
          color="primary"
          label="Cancelar"
          v-close-popup="!cancelEnabled"
        />
        <q-btn
          color="secondary"
          label="Agregar"
          @click="roleStore.addArea(newItem, icon)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoleStore } from "stores/RoleStore";

export default defineComponent({
  name: "ProtectedPage",

  setup() {
    const $q = useQuasar();
    const roleStore = useRoleStore();
    const newItem = ref("");
    const icon = ref("");

    return {
      roleStore,
      newItem,
      icon,
      dialog: ref(false),
      cancelEnabled: ref(false),

      onItemClick(item) {
        roleStore.selectedArea(item);
        $q.notify({
          message: item.name,
          icon: item.icon,
        });
      },
    };
  },
});
</script>
