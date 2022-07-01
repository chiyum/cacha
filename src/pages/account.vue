<template>
  <div class="articleModule">
    <div class="moduleTitle">
      <div class="text">編輯獎池</div>
      <div class="line"></div>
      <div class="text en">Edit</div>
    </div>
  </div>
  <ul class="account-list">
    <li>
      <div>帳號</div>
      <div>密碼</div>
      <div>稀有度</div>
      <div>名稱</div>
    </li>
    <li
      v-for="item in form.list"
      :key="item.userId"
      v-show="form.list.length !== 0"
    >
      <div>{{ item.username }}</div>
      <div class="edit">
        <span class="svgicon edit" @click="showEditModal(item)"></span
        ><span class="svgicon del" @click="del(item)"></span>
      </div>
    </li>
    <li v-show="form.list.length === 0">人員列表為空</li>
  </ul>
  <div class="submit">
    <div class="btns" @click="delAll">刪除全列表資料</div>
  </div>
  <Modal :title="`編輯`" v-if="form.isShow">
    <div class="modal">
      <div class="col">
        <div class="label">名稱</div>
        <div class="enter">
          <input type="text" v-model="form.modal.userName" />
        </div>
      </div>
      <div class="col right">
        <div class="btns" @click.prevent="form.isShow = false">取消</div>
        <div class="btns" @click="edit">修改</div>
      </div>
    </div>
  </Modal>
</template>
<script>
import { reactive, onMounted, inject } from "vue";
import Modal from "@/widgets/modal.vue";
import axios from "axios";
export default {
  layout: "layout-host",
  components: {
    Modal,
  },
  setup() {
    const swal = inject("$swal");
    const form = reactive({
      modal: {
        id: "",
        userName: "",
      },
      list: [],
      isShow: false,
    });

    const getList = async () => {
      let res = await axios.get(
        "https://drawing.wolves.com.tw/api/v1/mollie/user/list"
      );
      if (res.data.state !== 1) return;
      console.log(res);
      form.list = res.data.result;
    };

    const delAll = async () => {
      let res = await swal.fire({
        title: "操作確認",
        text: "確定要清空所有人員資料嗎",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "刪除",
        cancelButtonText: "取消",
        reverseButtons: true,
      });
      if (res.isConfirmed) {
        res = await axios.post(
          "https://drawing.wolves.com.tw/api/v1/mollie/user/del-all"
        );
        if (res.data.state !== 1)
          return swal.fire({
            title: "刪除失敗",
          });
        swal.fire({
          title: "刪除成功",
        });
        form.list = [];
      }
    };

    const showEditModal = (item) => {
      console.log(item);
      form.modal = {
        id: item.userId,
        userName: item.username,
      };
      form.isShow = true;
    };

    const edit = async () => {
      let res = await axios.post(
        "https://drawing.wolves.com.tw/api/v1/mollie/user/edit",
        [{ id: form.modal.id, userName: form.modal.userName }]
      );
      if (res.data.state !== 1) return swal.fire({ title: "修改失敗" });
      await getList();
      form.isShow = false;
      form.modal = {
        id: "",
        userName: "",
      };
      swal.fire({ title: "修改成功" });
    };

    const del = async (item) => {
      let temp = item;
      let ask = await swal.fire({
        title: "操作確認",
        text: `確定要刪除${item.username}的資料嗎`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "刪除",
        cancelButtonText: "取消",
        reverseButtons: true,
      });
      if (ask.isConfirmed) {
        console.log("確認", temp);
        let res = await axios.post(
          "https://drawing.wolves.com.tw/api/v1/mollie/user/del",
          [{ id: temp.userId }]
        );
        if (res.data.state !== 1) return swal.fire({ title: "刪除失敗" });
        await getList();
        swal.fire({ title: "刪除成功" });
      }
    };
    // const store = useStore();
    // const enter = ref("")
    onMounted(() => {
      getList();
    });
    return {
      form,
      del,
      edit,
      delAll,
      showEditModal,
    };
  },
};
</script>
<style lang="scss" seoped>
.account-list {
  width: 100%;
  min-height: 500px;
  padding: 2rem 3rem;
  border-radius: 6px;
  box-shadow: 1px 1px 1px 1px #c3c3c3;
  box-sizing: border-box;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    border: none;
    &:nth-child(odd) {
      background: #e6e3e3;
    }
    // border-bottom: 1px solid #cdcdcd;
    &:nth-child(1) {
      border-top: none;
      background: #e70012;
      color: #fff;
      border-radius: 6px 6px 0 0;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      word-break: break-all;
      text-align: center;
      border-right: none;
    }
    & > div:nth-child(1) {
      border: none;
    }
  }
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // padding: 1rem 0;
  // min-height: 300px;
  min-height: auto;
  .col {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    width: 100%;
    box-sizing: border-box;
    .label {
      width: 15%;
      text-align: center;
    }
    .enter {
      width: 85%;
      input {
        box-sizing: border-box;
        width: 100%;
        padding: 0px 5px;
        height: 29px;
        box-shadow: 1px 1px 4px #777;
        border: 0.5px #999;
        border-radius: 6px;
        background-color: #fff;
        outline: none;
      }
    }
    &.right {
      padding-top: 0;
      justify-content: flex-end;
      .btns {
        padding: 0.25rem 0.5rem;
        color: #fff;
        background: #0077e7;
        border-radius: 6px;
        &:nth-child(1) {
          margin-right: 5px;
          background: #999;
        }
      }
    }
  }
}

@media (max-width: 980px) {
  .account-list {
    padding: 1rem;
  }
}
</style>
