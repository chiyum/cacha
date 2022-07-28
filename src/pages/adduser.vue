<template>
  <div class="articleModule">
    <div class="moduleTitle">
      <div class="text">上傳人員</div>
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
import axios from "axios";
import { useRouter } from "vue-router";
// import $ from "jquery";
export default {
  layout: "layout-host",
  setup() {
    const swal = inject("$swal");
    const router = useRouter();
    const holder = "請輸入或貼上使用者名稱 \n範例：\nGeorge\nMollie";
    const form = reactive({
      list: [],
      data: "",
    });
    // console.log($);
    const sort = async () => {
      form.list = []; //reset
      let str = form.data;
      let ary = str.split("\n"); //去除換行
      for (const item of ary) {
        let split = item.split("\t");
        if (split.length !== 1) {
          swal.fire({ title: "格式錯誤" });
          break;
        }
        // console.log(item.data);
        form.list.push({
          userName: split[0],
        });
      }
      // var request = $.ajax({
      //   url: "https://drawing.wolves.com.tw/api/v1/mollie/user/add",
      //   method: "POST",
      //   data: { data: form.list },
      //   dataType: "jsonp",
      // });
      // request.done((data) => {
      //   console.log(data);
      // });
      swal.showLoadings();
      console.log(form.list);
      let res = await axios.post(
        "https://drawing.wolves.com.tw/api/v1/mollie/user/add",
        form.list
      );

      if (res.data?.state !== 1)
        return swal.fire({
          title: "上傳失敗",
          text: "請重新嘗試",
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
        router.push("/user");
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
</style>
