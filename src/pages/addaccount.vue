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
  <div class="modal"></div>
</template>
<script>
import { reactive, onMounted, inject } from "vue";
// import { useStore } from "vuex";
// import axios from "axios";
// import $ from "jquery";
export default {
  layout: "layout-host",
  setup() {
    const swal = inject("$swal");
    const holder =
      "請輸入或貼上獎池資料 \n格式:\n帳號 密碼 稀有等級 圖片網址\n範例：\nyakyuu001 yakyuu001 2 https://img.png";
    const form = reactive({
      list: [],
      data: "",
    });
    const sort = async () => {
      form.list = []; //reset
      let str = form.data;
      let ary = str.split("\n"); //去除換行
      for (const item of ary) {
        let split = item.split("\t");
        if (split.length !== 4) {
          swal.fire({ title: "格式錯誤" });
          break;
        }
        // console.log(item.data);
        form.list.push({
          account: split[0],
          password: split[1],
          rarity: split[2],
          img: split[3],
        });
      }
      console.log(form.list);
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
