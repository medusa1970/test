<template>
  <q-layout>
    <q-header elevated class="bg-white">
      <q-img src="~assets/image/fondo.jpg" class="absolute-bottom"> </q-img>
      <q-toolbar class="justify-center q-my-md">
        <img
          class="col-xs-7 col-sm-5 col-md-4 col-lg-3 col-xl-2"
          src="~assets/logo-sii-pi-verde.svg"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AdminAuthLy",

  setup() {
    return {};
  },
});
</script>
