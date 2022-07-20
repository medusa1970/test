<template>
  <q-layout>
    <q-header elevated class="bg-white">
      <q-img src="../assets/image/fondo.jpg" class="absolute-bottom" />
      <q-toolbar class="row justify-center">
        <img
          src="../assets/image/logo-sii-pi-verde.svg"
          class="col-3 q-my-md"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
