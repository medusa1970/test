<template>
  <q-item clickable v-ripple>
    <q-item-section>{{ name }}</q-item-section>
    <q-item-section avatar>
      <q-avatar color="purple" text-color="white" :icon="icon" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyComponent",
  props: {
    name: String,
    caption: String,
    icon: String,
  },
  setup() {
    return {};
  },
});
</script>
