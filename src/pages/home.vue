<template>
  <div class="home">
    <div class="form">
      <div class="title">受邀書</div>
      <div class="explain">
        <p>聖誕生存賽事即將展開，你想應戰嗎？</p>
        <p>留下你的資料吧！</p>
      </div>
      <div class="select">
        <select v-model="name">
          <option value="">選擇你的名稱</option>
          <option
            v-for="item in list"
            v-show="!item.flag"
            :key="item.userId"
            :value="item"
          >
            {{ item.username }}
          </option>
        </select>
      </div>
      <div class="confirm" @click="toOpenCard">確認</div>
    </div>
  </div>
</template>
<script>
import { ref, inject, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "@/axios";
export default {
  setup() {
    const name = ref("");
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
    const router = useRouter();
    const store = useStore();
    const list = ref([]);
    const toOpenCard = () => {
      // 待api取回
      console.log(name.value.username);
      if (!name.value?.username) {
        swal.fire("請選擇名稱");
        return;
      }
      swal
        .fire({
          title: "報名確認",
          text: `確認是${name.value?.username}前往應戰嗎？`,
          confirmButtonText: "確認",
          showCancelButton: true,
          cancelButtonText: "取消",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            swal.showLoadings();
            let res = await axios.post("/api/v1/account/random/draw", {
              userId: name.value.userId,
              userName: name.value.username,
            });
            if (res.data.state !== 1)
              return swal.fire({
                title: `錯誤訊息：${res.data.error[0].message}`,
                text: `請重新嘗試或聯絡Molie`,
              });
            swal.close();
            store.commit("app/set/card", res.data.result);
            router.push("/card");
          }
        });
    };
    const getList = async () => {
      swal.showLoadings();
      let res = await axios.get("/api/v1/mollie/user/list-flag");
      if (res.data.state !== 1) return swal.fire({ title: "列表載入失敗" });
      list.value = res.data.result || [];
      console.log(list.value);
      swal.close();
    };
    onMounted(() => {
      getList();
      computeSize();
      window.addEventListener("resize", computeSize);
    });
    // 離開頁面前的攔截
    onBeforeRouteLeave(async () => {
      window.removeEventListener(computeSize, false);
    });

    return {
      name,
      list,
      toOpenCard,
    };
  },
};
</script>
<style lang="scss" seoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("@/assets/home_bg2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .form {
    position: relative;
    bottom: 0.3rem;
    padding: 0.1rem;
    padding-bottom: 0.2rem;
    width: 70%;
    border-radius: 6px;
    background-color: rgba($color: #fff, $alpha: 0.9);
    .title,
    .explain {
      text-align: center;
    }
    .title {
      font-size: 0.35rem;
    }
    .select,
    .confirm {
      display: flex;
      justify-content: center;
    }
    .confirm {
      margin: 0 auto;
      margin-top: 0.2rem;
      padding: 0.1rem 0.2rem;
      width: 1.5rem;
      color: #fff;
      border-radius: 10px;
      // background-image: url("@/assets/btn_bg.jpeg");
      background-color: rgba($color: #000, $alpha: 0.5);
      background-size: contain;
    }
    select {
      padding: 0.05rem;
      width: 50%;
      background: none;
      border-radius: 3px;
    }
  }
}
</style>
