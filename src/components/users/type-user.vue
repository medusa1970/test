<template>
  <q-select
    filled
    v-model="typeUser"
    :options="data"
    :label="label"
    bg-color="amber-3"
  >
    <template v-slot:append>
      <q-icon :name="Icon" />
    </template>
    <template v-slot:hint> Field hint </template>

    <template v-slot:after>
      <q-btn round color="green-14" icon="add" @click="dialog = true" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          Cree tipo de usuario (administracion, cliente, etc)
        </q-item-section>
      </q-item>
    </template>
  </q-select>
  <type-user-dialog
    v-if="myComp == 'type'"
    v-model="dialog"
    @cancelEvent="dialog = false"
  />
</template>
<script>
import { ref, defineComponent } from "vue";
import { useUserStore } from "stores/user-store";
import typeUserDialog from "components/users/type-user-dialog.vue";

export default defineComponent({
  name: "type-user",
  props: {
    label: {
      type: String,
    },
    noData: {
      type: String,
    },
    Icon: {
      type: String,
    },
    data: {
      type: Array,
      default: () => [],
    },
    myComp: {
      type: String,
    },
  },
  components: {
    typeUserDialog,
  },
  setup() {
    const userStore = useUserStore();
    const typeUser = ref("");
    const dialog = ref(false);
    return {
      userStore,
      typeUser,
      dialog,
    };
  },
});
</script>
