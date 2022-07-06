<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Curso avanzado de VUE 3 </q-toolbar-title>

        <div>Por.: Jaime Vallejos</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "Mi curso de VUE 3",
    icon: "school",
    route: "/",
  },
  {
    title: "Componentes",
    caption: "Curso componentes",
    icon: "hive",
    route: "/components",
  },
  {
    title: "Fundamentos",
    caption: "Fundamentos de VUE 3",
    icon: "ballot",
    route: "/fundaments",
  },
  {
    title: "Practicas",
    caption: "Yo pasare de curso",
    icon: "ballot",
    route: "/practices",
  },
  {
    title: "Experimentos",
    caption: "Aqui mis experimentos VUE 3",
    icon: "science",
    route: "/experiments",
  },
  {
    title: "Protegida",
    caption: "Pagina protegida",
    icon: "https",
    route: "/protected",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
