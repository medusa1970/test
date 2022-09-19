<template>
  <q-select v-model="myValue" filled :options="data" :label="label" bg-color="amber-3">
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

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
import { ref, defineComponent } from "vue";

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
  },

  setup() {
    const myValue = ref("");

    return {
      myValue,
    };
  },
});
</script>
