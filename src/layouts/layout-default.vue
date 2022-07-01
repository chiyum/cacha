<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
import { onMounted, inject } from "vue";
export default {
  setup() {
    const swal = inject("$swal");
    const computeSize = () => {
      /* 設計尺寸： 750 * 1334 */
      /* 字體大小隨著螢幕寬度更改 */
      if (document.body.clientWidth > 750) {
        swal.fire({
          title: "溫馨提醒",
          text: "請使用手機操作",
          customClass: "swal2-alert",
        });
      }
      document.getElementsByTagName("html")[0].style = `font-size: ${
        (document.body.clientWidth / 750) * 100
      }px`;
    };
    onMounted(() => {
      computeSize();
      window.addEventListener("resize", computeSize);
    });
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  // height: 100%;
  margin: 0;
  font-family: "微軟正黑體", Microsoft JhengHei, Tahoma, Geneva, Verdana,
    sans-serif;
  // overflow: hidden;
}
.layout {
  font-size: 0.3rem;
  height: 100vh;
}
.swal2-container {
  font-size: 16px !important;
}
</style>
