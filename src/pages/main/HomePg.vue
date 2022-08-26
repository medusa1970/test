<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="300px"
      class="bg-grey-1 shadow-2 rounded-borders"
    >
      <q-carousel-slide
        v-for="(slide, index) in slides"
        :key="index"
        :name="slide.name"
        class="column no-wrap"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders col-6 full-height"
            src="../../assets/image/menu1.png"
          />
          <q-img
            class="rounded-borders col-6 full-height"
            src="../../assets/image/menu2.png"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from "vue";

const slides = [
  {
    name: "1",
    img: "../../assets/image/menu1.png",
  },
  {
    name: "2",
    img: "../../assets/image/menu2.png",
  },
  {
    name: "3",
    img: "../../assets/image/menu3.png",
  },
  {
    name: "4",
    img: "../../assets/image/menu4.png",
  },
  {
    name: "5",
    img: "../../assets/image/menu5.png",
  },
  {
    name: "6",
    img: "../../assets/image/menu1.png",
  },
];

export default {
  setup() {
    return {
      slide: ref(1),
      slides,
    };
  },
};
</script>
