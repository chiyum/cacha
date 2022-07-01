<template>
  <div class="cacha">
    <div class="explain">點擊！然後展開你的旅程吧！</div>
    <div class="card" :class="{ active: isActive }" @click="open">
      <img :src="card" />
    </div>
  </div>
  <div class="result" :class="{ active: isActive }">來了</div>
</template>
<script>
import card from "@/assets/card_back.png";
import { ref } from "vue";
export default {
  setup() {
    const isActive = ref(false);
    const open = () => {
      isActive.value = true;
    };
    return {
      isActive,
      card,
      open,
    };
  },
};
</script>
<style lang="scss" seoped>
:root {
  --light: #fff;
  --blur: 14px;
  --opacity: 0;
}
.cacha {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("@/assets/gacha_bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  .explain {
    margin-bottom: 0.5rem;
    color: #fff;
  }
  .card {
    position: relative;
    width: 50%;
    animation: baloon_1 3s infinite;
    transition: all 1s;
    img {
      position: relative;
      width: 100%;
      z-index: 1;
    }
    // &::before {
    //   position: absolute;
    //   content: "";
    //   height: 100%;
    //   width: 100%;
    //   top: 0;
    //   left: 0;
    //   background-color: var(--light);
    //   opacity: var(--opacity);
    //   filter: blur(var(--blur));
    //   z-index: 0;
    // }
    &::after {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      height: 0;
      width: 0;
      margin: 0 auto;
      filter: blur(20px);
      background-color: var(--light);
      border-radius: 50%;
      opacity: 1;
      z-index: 2;
      transform: translate(-50%, -50%);
      transition: all 0.5s;
    }
    &.active {
      animation: pull 2s ease forwards;
      &::after {
        // opacity: 1;
        // animation: opens 5s ease forwards;
        // animation: opens 3s cubic-bezier(.37,.34,.23,.73) infinite;
        animation: opens 4s cubic-bezier(0.47, 0.23, 0.34, 0.67) forwards;
        animation-delay: 2s;
        // opacity: var(--opacity);
      }
    }
  }
  @keyframes baloon_1 {
    //上下晃動 animation: baloon_1 3s infinite;
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @keyframes opens {
    //上下晃動 animation: baloon_1 3s infinite;
    0% {
      width: 1em;
      height: 1em;
    }
    10% {
      width: 3rem;
      height: 3rem;
    }
    25% {
      width: 2rem;
      height: 2rem;
    }
    50% {
      width: 3rem;
      height: 3rem;
    }
    // 75% {
    //   width: 10rem;
    //   height: 10rem;
    // }
    100% {
      width: 20rem;
      height: 20rem;
    }
  }
  @keyframes pull {
    0% {
      transform: translateY(20px);
    }
    // 30% {
    //   transform: translateY(10px);
    // }
    100% {
      transform: translateY(0px);
    }
  }
}
.result {
  position: fixed;
  left: 0;
  top: 0;
  // display: none;
  z-index: -1;
  transition: all 0.3s;
  transition-delay: 6s;
  width: 100%;
  height: 100%;
  // background: #e7e4e4;
  &.active {
    // display: flex;
    z-index: 11;
    // visibility: visible;
  }
}
</style>
