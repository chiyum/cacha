<template>
  <div class="modal__wrap">
    <div class="modal__item">
      <div class="modal__head">
        {{ title }}
      </div>
      <slot>
        <div class="modal__main">preset</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.modal__wrap {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  background: rgba(0, 0, 0, 0.6);
}
.modal__item {
  transform: translateY(40%);
  width: 550px;
  border-radius: 6px;
  background: #fff;
  animation: showModal forwards ease 0.5s;
}
@keyframes showModal {
  0% {
    transform: translateY(40%);
  }
  100% {
    transform: translateY(-10%);
  }
}

@media (max-width: 980px) {
  .modal__item {
    width: 350px;
  }
}
.modal__head {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  border-bottom: 0.5px solid #cdcdcd;
  background: #016fa7;
  color: #fff;
}
.modal_main {
  min-height: 300px;
}
</style>
