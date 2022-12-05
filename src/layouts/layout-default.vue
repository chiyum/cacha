<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
// import { onMounted, inject } from "vue";
export default {
  setup() {},
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
