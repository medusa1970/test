<template>
  <q-item clickable v-ripple>
    <q-item-section>{{ nombre }}</q-item-section>
    <q-item-section avatar>
      <q-avatar color="purple" text-color="white" :icono="icon" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyExamen",
  props: {
    nombre: String,
    subtitle: String,
    icono: String,
  },
  setup() {
    return {};
  },
});
</script>
