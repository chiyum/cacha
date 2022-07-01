<template>
  <div class="home">
    <div class="form">
      <div class="title">受邀書</div>
      <div class="explain">
        <p>菠菜王賽事即將展開，你想應戰嗎？</p>
        <p>留下你的資料吧！</p>
      </div>
      <div class="select">
        <select v-model="name">
          <option value="">選擇你的名稱</option>
          <option :value="'George'">George</option>
          <option :value="'Mollie'">Mollie</option>
          <option :value="'Shoin'">Shoin</option>
          <option :value="'Jimmy'">jimmy</option>
        </select>
      </div>
      <div class="confirm" @click="toOpenCard">確認</div>
    </div>
  </div>
</template>
<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const name = ref("");
    const swal = inject("$swal");
    const router = useRouter();
    const toOpenCard = () => {
      // 待api取回
      if (name.value === "") {
        swal.fire("請選擇名稱");
        return;
      }
      swal
        .fire({
          title: "報名確認",
          text: `確認是${name.value}前往應戰嗎？`,
          confirmButtonText: "確認",
          showCancelButton: true,
          cancelButtonText: "取消",
        })
        .then((result) => {
          if (result.isConfirmed) {
            router.push("/card");
          }
        });
    };
    return {
      name,
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
  background-image: url("@/assets/home_bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  .form {
    padding: 0.1rem;
    padding-bottom: 0.2rem;
    width: 70%;
    border-radius: 6px;
    background-color: rgba($color: #fff, $alpha: 0.5);
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
