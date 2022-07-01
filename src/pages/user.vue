<template>
  <div class="articleModule">
    <div class="moduleTitle">
      <div class="text">編輯使用者</div>
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
      <div>
        <span class="svgicon edit"></span><span class="svgicon del"></span>
      </div>
    </li>
    <li v-for="(item, index) in devData" :key="item.id + index">
      <div>{{ item.account }}</div>
      <div>{{ item.password }}</div>
      <div>{{ item.rarity }}</div>
      <div>{{ item.username }}</div>
      <div class="edit">
        <span class="svgicon edit"></span><span class="svgicon del"></span>
      </div>
    </li>
  </ul>
  <Modal :title="`編輯`">
    <div class="modal">
      <div class="col">
        <div class="label"></div>
        <div class="enter">
          <input type="text" />
        </div>
      </div>
    </div>
  </Modal>
</template>
<script>
// import { computed, ref, inject } from "vue";
import Modal from "@/widgets/modal.vue";
export default {
  layout: "layout-host",
  components: {
    Modal,
  },
  setup() {
    const devData = [
      {
        id: "1542398498152910848",
        account: "shion",
        password: "qwqw1212",
        userId: "1540262324303040512",
        username: "jimmy2",
        rarity: 1,
        img: "123",
        created_at: "2022-06-30T14:43:53+08:00",
        updated_at: "2022-06-30T14:49:36+08:00",
      },
      {
        id: "1542398498173882368",
        account: "yakyuu12345",
        password: "456",
        userId: "0",
        username: "梅西",
        rarity: 4,
        img: "456",
        created_at: "2022-06-30T14:43:53+08:00",
        updated_at: "2022-06-30T14:43:53+08:00",
      },
    ];
    // const swal = inject("$swal");
    // const store = useStore();
    // const enter = ref("")
    return {
      devData,
    };
  },
};
</script>
<style lang="scss" seoped>
.account-list {
  width: 100%;
  min-height: 500px;
  padding: 2rem;
  box-sizing: border-box;
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cdcdcd;
    &:nth-child(1) {
      border-top: 1px solid #cdcdcd;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 22.5%;
      word-break: break-all;
      text-align: center;
      border-right: 1px solid #cdcdcd;
    }
    & > div:nth-child(5) {
      width: 10%;
      border-right: 1px solid #cdcdcd;
      justify-content: space-evenly;
    }
    & > div:nth-child(1) {
      border-left: 1px solid #cdcdcd;
    }
  }
}

.modal {
  min-height: 300px;
}

@media (max-width: 980px) {
  .account-list {
    padding: 0;
  }
}
</style>
