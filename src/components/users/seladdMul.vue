<template>
  <!-- como emitir valor de un select
 -->

  <q-select
    v-model="myValue"
    filled
    multiple
    :options="data"
    :label="label"
    bg-color="white"
  >
    <template v-slot:append>
      <q-icon :name="Icon" />
    </template>
    <template v-slot:hint> Field hint </template>

    <template v-slot:after>
      <q-btn round color="green-14" icon="add" @click="$emit('myDialog', model)" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          {{ noData }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
import { ref, defineComponent, watch } from "vue";
import { useUserStore } from "stores/user-store";

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
  setup() {
    const userStore = useUserStore();
    const myValue = ref("");

    return {
      userStore,
      selValue: ref(null),
      dialog: ref(false),
      myValue,
    };
  },
});
</script>
