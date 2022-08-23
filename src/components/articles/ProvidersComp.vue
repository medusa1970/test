<template>
  <div>
    <q-select
      filled
      v-model="provider"
      :options="providers"
      label="Proveedores *"
      bg-color="amber-3"
    >
      <template v-slot:append>
        <q-icon name="fa-solid fa-truck" />
      </template>
      <template v-slot:hint> Field hint </template>

      <template v-slot:after>
        <q-btn round color="green-14" icon="add" />
      </template>
    </q-select>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const provider = ref(null);
    return {
      provider,
      providers: [
        { value: "1231234", label: "Don Juan" },
        { value: "1231234", label: "Pil" },
        { value: "1231234", label: "Chocho Nancy" },
        { value: "1231234", label: "Huevos Sergio" },
      ],
    };
  },
});
</script>
