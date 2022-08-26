<template>
  <!-- como emitir valor de un select
 -->

  <q-select
    v-model="myValue"
    filled
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
          {{ noData }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>

  <!--   <selAddDialog
    v-if="myComp == 'type'"
    v-model="dialog"
    @cancelEvent="dialog = false"
  />
 -->
</template>
<script>
import { ref, defineComponent, watch } from "vue";
import { useUserStore } from "stores/user-store";
import selAddDialog from "components/users/seladd-dialog.vue";

export default defineComponent({
  name: "sel-add",
  props: {
    model: {
      type: String,
    },
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
    typeUser: {
      type: String,
    },
  },
  components: {
    selAddDialog,
  },

  setup() {
    const userStore = useUserStore();
    const myValue = ref("");
    watch(myValue, async (val) => {
      // emitir valor de un select a padre
    });

    return {
      userStore,
      selValue: ref(null),
      dialog: ref(false),
      myValue,
    };
  },
});
</script>
