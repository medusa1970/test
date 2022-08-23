<template>
  <div>
    <h6>{{ ejemStore.algo }}</h6>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { useEjemStore } from "stores/ejem-store"; // paso 1: importar el store

export default defineComponent({
  name: "EjemPg",

  setup() {
    const ejemStore = useEjemStore(); // paso 2: usar el store

    return {
      ejemStore, // paso 3: pasar el store a la vista
    };
  },
});
</script>
