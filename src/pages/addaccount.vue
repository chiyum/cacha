<template>
  <div class="articleModule">
    <div class="moduleTitle">
      <div class="text">上傳獎池</div>
      <div class="line"></div>
      <div class="text en">Add</div>
    </div>
  </div>
  <div class="add">
    <textarea v-model="form.data" :placeholder="holder"></textarea>
  </div>
  <div class="submit">
    <div class="btns" @click="sort">上傳</div>
  </div>
</template>
<script>
import { reactive, onMounted, inject } from "vue";
// import { useStore } from "vuex";
// import axios from "axios";
// import $ from "jquery";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  layout: "layout-host",
  setup() {
    const swal = inject("$swal");
    const router = useRouter();
    const holder =
      "請輸入或貼上excel格式的獎池資料 \n格式:\n帳號 密碼 稀有等級 獎品名稱 圖片網址\n範例：\nyakyuu001 yakyuu001 2 梅西 https://img.png";
    const form = reactive({
      list: [],
      data: "",
    });
    const sort = async () => {
      form.list = []; //reset
      let num = 0;
      let str = form.data;
      let ary = str.split("\n"); //去除換行
      for (const item of ary) {
        let split = item.split("\t");
        if (split.length !== 5) {
          let split2 = item.split(" ");
          if (split2.length !== 5) return num++;
          split = split2;
        }

        form.list.push({
          account: split[0],
          password: split[1],
          rarity: ~~split[2],
          prizeName: split[3],
          img: split[4],
        });
      }
      if (num !== 0) return swal.fire({ title: "格式錯誤" });
      console.log(form.list);
      swal.showLoadings();
      let res = await axios.post(
        "https://drawing.wolves.com.tw/api/v1/mollie/account/add",
        form.list
      );

      if (res.data?.state !== 1)
        return swal.fire({
          title: "上傳失敗",
          text: `原因為：${res.data.error[0].message}，請重新嘗試`,
        });
      form.data = "";
      let ask = await swal.fire({
        title: "上傳成功",
        text: "是否前往查看列表",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "前往",
        cancelButtonText: "取消",
        reverseButtons: true,
      });
      if (ask.isConfirmed) {
        router.push("/account");
      }
    };

    onMounted(() => {});
    return {
      form,
      holder,
      sort,
    };
  },
};
</script>
<style lang="scss" seoped>
.add {
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 1rem;
  width: 100%;
  height: 500px;
  textarea {
    padding: 0.2rem;
    width: calc(100% - 2rem);
    height: 100%;
    // border: none;
  }
}
.submit {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem 1rem;
  .btns {
    padding: 0.5rem 1.2rem;
    color: #fff;
    background: #e70012;
    cursor: pointer;
  }
}
.svgicon {
  margin: 2.5px;
}
</style>
