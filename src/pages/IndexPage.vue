<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="secondary"
      navigation
      padding
      arrows
      height="300px"
      class="bg-grey-1 shadow-2 rounded-borders"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://ed.team/_next/image?url=https%3A%2F%2Fedteam-media.s3.amazonaws.com%2Fcourses%2Fbig%2F3886d909-4c3a-4e5c-a004-68cc5fcdccea.png&w=1920&q=75"
          />
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://kinsta.com/es/wp-content/uploads/sites/8/2021/08/what-to-know-about-vue-js.jpeg"
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap">
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://i.morioh.com/201130/ef8eb109.webp"
          />
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://miro.medium.com/max/1400/1*lD-F8aUgLwJqRB4v_86yKA.jpeg"
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap">
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://www.blogsaays.com/wp-content/uploads/2021/05/Vue-js.png"
          />
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://www.yuhiro.de/wp-content/uploads/2020/12/Frontend-Entwicklung.jpg"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="q-pa-md q-gutter-sm">
      <q-banner class="bg-secondary text-white">
        No te faltes ni un curso o te quedaras atras como Steve. Registrate tu
        tambien
        <template v-slot:action>
          <q-btn flat color="white" label="Incribirme" />
          <q-btn flat color="white" label="Pagar con tarjeta" />
        </template>
      </q-banner>

      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="signal_wifi_off" color="secondary" />
        </template>
        Aprenderemos mucho en este curso extraordinario.
        <template v-slot:action>
          <q-btn flat color="secondary" label="Turn on Wifi" />
        </template>
      </q-banner>
    </div>
  </div>
  {{ varia }}
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      lorem:
        "Este curso sera dictado por el fascinante profesor Jaime Vallejos, quien se encargara de guiar y orientar a los estudiantes en el desarrollo de sus propios componentes.",
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
