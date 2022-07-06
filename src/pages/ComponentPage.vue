<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered>
      <MyComponent v-for="item in mi_menu" :key="item.name" v-bind="item" />
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MyComponent from "components/MyComponent.vue";

export default defineComponent({
  name: "ComponentsPage",
  components: {
    MyComponent,
  },
  setup() {
    const mi_menu = [
      {
        name: "Curso de Vue",
        caption: "Especializado para nosotros",
        icon: "home",
      },
      {
        name: "Curso de Quasar",
        caption: "Especializado para nosotros",
        icon: "add_circle",
      },
    ];
    return {
      mi_menu,
    };
  },
});
</script>
