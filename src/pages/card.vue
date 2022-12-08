<template>
  <div class="cacha">
    <div
      class="card"
      :class="{ active: status.isActive, ani: status.isAnimation }"
    >
      <img class="back" :src="card" />
      <!-- 避免css及圖片載入太慢會直接顯示結果 所以使用v-show -->
      <div class="front" v-show="status.isActive">
        <div class="content">{{ form?.prizeName }}</div>
      </div>
    </div>
    <div class="explain" v-show="!status.isAnimation">
      <div>展開你的旅程吧！</div>
      <div class="icon"></div>
    </div>
  </div>
  <!-- <div class="result" :class="{ active: status.isActive }">來了</div> -->
</template>
<script>
import card from "@/assets/card_back.png";
import { reactive, onMounted, computed, inject } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const swal = inject("$swal");
    const status = reactive({
      isAnimation: false,
      isActive: false,
    });
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
    const open = () => {
      status.isActive = true;
    };
    const position = reactive({
      startY: 0,
      dom: "",
      height: "",
      width: "",
    });
    const form = computed(() => store.state.app.card);

    const setDomSize = () => {
      let card = document.querySelector(".card");
      let back = document.querySelector(".front");
      back.style.height = card.clientHeight;
      back.style.width = card.clientWidth;
    };

    /* 開始拖曳 記錄起始點 */
    function dragStart(e) {
      /* 手機端開啟則return */
      if (status.isActive) return;
      /* 若動畫效果開啟過，則關閉 */
      if (status.isAnimation) status.isAnimation = false;
      if (e.changedTouches) {
        //手機端
        position.startY = e.changedTouches[0].clientY;
      } else {
        position.startY = e.clientY;
      }
      /* 滑鼠事件 */
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", stop);
      /* 移動端事件 */
      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("touchend", stop);
    }

    function move(e) {
      // 超過的50的if需要else
      // Else:給動畫class及執行position.Y = 0
      // 需要先給50再給0，因為要有動畫。
      // 或者也可以觸發回縮的動畫function
      // 圖片選擇使用getimgurl動態的方式處理
      // 搭配swiper

      // 在卡片dom內層再塞一個滿版dom，再轉為正面時顯示
      // 或是卡牌片分前後兩個dom

      /* 計算出移動座標 */
      // 這邊要寫收回動畫class
      e.preventDefault();
      let y;
      if (e.changedTouches) {
        y = e.changedTouches[0].clientY - position.startY;
      } else {
        y = e.clientY - position.startY;
      }
      /* 這邊需要寫判斷 當拖曳沒有到觸發事件結果的時候要恢復到原先位置及恢復到位置時需要給transition動畫的class */
      // 以及判斷數字不能小於0，小於0則不動
      /* 不能向上移動 */
      if (y <= 0) y = 0;
      /* 滑過200就觸發事件 */
      if (y >= 200) {
        y = 200;
        open();
      } else {
        status.isAnimation = true;
        setTimeout(() => {
          position.dom.style.top = 0 + "px";
        }, 1000);
      }
      // if(y >=)
      position.dom.style.top = y + "px";
    }

    function stop() {
      // 滑鼠事件
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
      // 移動端事件
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", stop);
    }
    // dragDiv.addEventListener("mousedown", dragStart); //滑鼠事件
    // dragDiv.addEventListener("touchstart", dragStart); //移動端事件
    onMounted(() => {
      position.dom = document.querySelector(".card");
      position.dom.addEventListener("mousedown", dragStart); //滑鼠事件
      position.dom.addEventListener("touchstart", dragStart); //移動端事件
      setDomSize();
      computeSize();
    });
    return {
      card,
      form,
      status,
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
  overflow: hidden;
  .explain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    color: #fff;
    .icon {
      margin-top: 0.5rem;
      width: 30px;
      height: 16px;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("@/assets/images/arrow.png");
      transform: rotate(90deg);
      animation: baloon_1 2s infinite;
    }
  }
  .card {
    position: relative;
    width: 50%;
    // animation: baloon_1 3s infinite;
    // transition: all 1s;
    img {
      position: relative;
      width: 100%;
      z-index: 3;
      backface-visibility: hidden; //重要！！！！這是翻轉的主要屬性
    }
    .front {
      position: absolute;
      top: 1px;
      left: 2px;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 98%;
      height: 98%;
      border-radius: 13px;
      // background: #fff;
      z-index: 2;
      box-sizing: border-box;
      background-image: url("@/assets/card_front.png");
      background-repeat: no-repeat;
      background-size: cover;
      // backface-visibility: hidden;
      .content {
        color: #e7d4a5;
        font-size: 0.4rem;
        transform: rotateY(180deg);
      }
    }
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
      // z-index: 2;
      transform: translate(-50%, -50%);
      transition: all 0.5s;
    }
    &.active {
      animation: pull 2s ease forwards;
      &::after {
        animation: lights 3s cubic-bezier(0.47, 0.23, 0.34, 0.67) forwards;
        animation-delay: 2s;
        z-index: 3;
        // opacity: var(--opacity);
      }
      .back {
        animation: turn 2s linear forwards;
        animation-delay: 5s;
      }
      .front {
        animation: turn2 2s linear forwards;
        animation-delay: 5s;
      }
    }
    &.ani {
      transition: all 0.3s linear;
    }
  }
  @keyframes baloon_1 {
    //上下晃動 animation: baloon_1 3s infinite;
    0% {
      transform: translateY(0px) rotate(90deg);
    }
    50% {
      transform: translateY(10px) rotate(90deg);
    }
    100% {
      transform: translateY(0px) rotate(90deg);
    }
  }
  @keyframes turn {
    0% {
      transform: rotateY(0deg);
    }
    // 50% {
    //   // z-index: 1;
    // }
    100% {
      transform: rotateY(180deg);
      // z-index: 1;
    }
  }
  @keyframes turn2 {
    0% {
      transform: rotateY(0deg);
    }
    // 50% {
    //   // z-index: 2;
    // }
    100% {
      transform: rotateY(180deg);
      // z-index: 2;
    }
  }
  @keyframes lights {
    //上下晃動 animation: baloon_1 3s infinite;
    0% {
      width: 1em;
      height: 1em;
    }
    25% {
      width: 2rem;
      height: 2rem;
    }
    50% {
      width: 1rem;
      height: 1rem;
    }
    75% {
      width: 2rem;
      height: 2rem;
    }
    100% {
      width: 0rem;
      height: 0rem;
    }
  }
  @keyframes pull {
    0% {
      transform: translateY(200px);
    }
    30% {
      transform: translateY(300px);
    }
    100% {
      transform: translateY(0px) scale(1.5);
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
