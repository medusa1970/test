<template>
  <div>
    <q-select
      filled
      v-model="unit"
      :options="units"
      label="Unidad de Medida *"
      bg-color="amber-3"
    >
      <template v-slot:append>
        <q-icon name="bubble_chart" />
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
    const unit = ref(null);
    return {
      unit,
      units: [
        { value: "1231234", label: "{Quintal 45, Arroba, Kilogramo, Gramo}" },
        { value: "1231234", label: "{Bulto, Jaba, Paquete, Tira}" },
        { value: "1231234", label: "{Paquete, Botella}" },
      ],
    };
  },
});
</script>
