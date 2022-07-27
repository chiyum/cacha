<template>
  <swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide
    ><swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide
    ><swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide
    ><swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide
    ><swiper-slide>Slide 9</swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { onMounted } from "vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  layout: "layout-host",
  setup() {
    onMounted(() => {
      document.querySelector(".slot").style.height = 100 + "%";
    });
    return {
      modules: [Pagination],
    };
  },
};
</script>
<style lang="scss" scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}
</style>
