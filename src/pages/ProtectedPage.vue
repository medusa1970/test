<template>
  <div class="row q-ma-md">
    <div class="col-4">
      <AreasComp />
    </div>
    <div v-if="roleStore.areaSelected" class="col-4">
      <AccessComp />
    </div>
    <div v-if="roleStore.accessSelected" class="col-4">
      <LinksComp />
    </div>
  </div>
  {{ roleStore.areaSelected }}
  <br /><br />
  {{ roleStore.accessSelected }}
  <br /><br />
  {{ roleStore.linksSelected }}
  <br /><br />
  {{ roleStore.botar }}

  <br />
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoleStore } from "stores/RoleStore";
import AreasComp from "src/components/roles/AreasComp.vue";
import AccessComp from "src/components/roles/AccessComp.vue";
import LinksComp from "src/components/roles/LinksComp.vue";

export default defineComponent({
  name: "ProtectedPage",
  components: {
    AreasComp,
    AccessComp,
    LinksComp,
  },

  setup() {
    const $q = useQuasar();
    const roleStore = useRoleStore();
    const newArea = ref("");
    const icon = ref("");
    const selectedArea = ref("Seleccione Area");

    onMounted(() => {
      roleStore.load();
    });
    return {
      roleStore,
      newArea,
      icon,
      selectedArea,
      dialog: ref(false),
      cancelEnabled: ref(false),

      onItemClick(item) {
        selectedArea.value = item.name;
        $q.notify({
          message: item.name,
          icon: item.icon,
        });
      },
    };
  },
});
</script>
