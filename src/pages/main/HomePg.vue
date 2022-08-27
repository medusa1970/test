<template>
  <div class="q-pa-none row justify-center q-gutter-sm">
    <q-carousel
      class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-12"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      transition-prev="slide-right"
      autoplay="10000"
      style="max-width: 400px; height: 400px"
    >
      <q-carousel-slide :name="1" img-src="/src/assets/image/menu1.png" />
      <q-carousel-slide :name="2" img-src="/src/assets/image/menu2.png" />
      <q-carousel-slide :name="3" img-src="/src/assets/image/menu3.png" />
      <q-carousel-slide :name="4" img-src="/src/assets/image/menu4.png" />
      <q-carousel-slide :name="5" img-src="/src/assets/image/menu5.png" />
    </q-carousel>
    <q-carousel
      class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-12"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      transition-next="slide-left"
      autoplay
      style="max-width: 400px; height: 400px"
    >
      <q-carousel-slide :name="3" img-src="/src/assets/image/menu1.png" />
      <q-carousel-slide :name="4" img-src="/src/assets/image/menu2.png" />
      <q-carousel-slide :name="5" img-src="/src/assets/image/menu3.png" />
      <q-carousel-slide :name="1" img-src="/src/assets/image/menu4.png" />
      <q-carousel-slide :name="2" img-src="/src/assets/image/menu5.png" />
    </q-carousel>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
    };
  },
};
</script>
