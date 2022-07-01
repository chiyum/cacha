<template>
  <div class="layout__head">
    <div
      class="head__nav__mobile"
      @click="shop.mobileShowMenu = !shop.mobileShowMenu"
      :class="{ active: shop.mobileShowMenu }"
    >
      <span class="top__bun"></span>
      <span class="stuffing"></span>
      <span class="bottom__bun"></span>
    </div>
    <div class="head__logo">
      <!-- <img :src="logo" /> -->
      <router-link to="/home"></router-link>
    </div>
    <ul class="head__nav">
      <li
        v-for="item in shop.nav"
        :key="item.text"
        @mouseover="hover(item)"
        @mouseout="hover(item)"
        @click="toPath(item)"
      >
        <div>
          {{ item.text }}
        </div>
        <div
          class="drop"
          v-if="item?.drops"
          :style="{ height: item.height + 'px' }"
        >
          <a
            @click.prevent="toPath(data)"
            v-for="data in item.drops"
            :key="data.text"
          >
            {{ data.text }}
          </a>
        </div>
      </li>
    </ul>
    <div class="mobile__nav" :class="{ active: shop.mobileShowMenu }">
      <div class="mobile__nav__list">
        <div class="title">MENU</div>
        <ul>
          <li
            v-for="item in shop.nav"
            :key="item.text"
            :class="{ active: item.isActive }"
          >
            <div class="item" @click="active(item)">
              <span>
                {{ item.text }}
              </span>
              <span class="icon" :class="{ active: item.isActive }"> </span>
            </div>
            <div class="drop" v-if="item?.drops && item.isActive">
              <a
                v-for="data in item.drops"
                :key="data.text"
                @click.prevent="toPath(data)"
              >
                {{ data.text }}
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div class="mobile__nav__btn" @click="shop.mobileShowMenu = false"></div>
    </div>
  </div>
  <div class="slot">
    <slot />
  </div>
  <div class="layout__footer">
    <div class="footer__line">
      <div class="footer__line__gotop" @click="goTop"></div>
    </div>
    <div class="footer__main">
      <div class="promote">
        <div class="name">發布者設定專區</div>
      </div>
      <div class="link">
        <ul>
          <li v-for="item in shop.nav" :key="item.text" v-show="item?.drops">
            <div class="title">{{ item.text }}</div>
            <div class="list" v-if="item?.drops">
              <a
                v-for="data in item.drops"
                :key="data.text"
                @click.prevent="toPath(data)"
              >
                {{ data.text }}
              </a>
            </div>
          </li>
        </ul>
        <div class="link__contact"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
// import logo from "@/assets/images/logo.jpeg";
export default {
  setup() {
    const router = useRouter();
    const shop = reactive({
      nav: [
        {
          text: "公司人員",
          path: "/user",
          height: 0,
          isActive: false,
          drops: [
            {
              text: "資料上傳",
              path: "/adduser",
            },
            {
              text: "列表及修改",
              path: "/user",
            },
          ],
        },
        {
          text: "獎池設定",
          path: "/account",
          height: 0,
          isActive: false,
          /* 不管北部南部都在門市資訊頁面 透過vuex傳參數切換門市選項 */
          drops: [
            {
              text: "上傳獎池",
              path: "/addaccount",
            },
            {
              text: "獎池列表",
              path: "/account",
            },
          ],
        },
      ],
      promote: [
        {
          text: "YouTube",
          icon: "you",
          link: null,
        },
        {
          text: "LINE",
          icon: "lin",
          link: "https://line.me/R/ti/p/%40jfz8787k",
        },
        {
          text: "FaceBook",
          icon: "fb",
          link: "https://www.facebook.com/petsmall.com.tw/",
        },
        {
          text: "instagram",
          icon: "ig",
          link: "https://www.instagram.com/petsmall_fish",
        },
        // {
        //   text: "訂閱電子報",
        //   link:
        //     "https://www.youtube.com/channel/UCeFI4lgYrSJZ3hCEiLmN-7w/featured?view_as=subscriber",
        // },
      ],
      footerNav: [
        {
          text: "門市資訊",
          icon: "store",
          path: "/store",
        },
        {
          text: "客服信箱",
          icon: "service",
          link: "https://www.joo.com.tw/petsmall/index.php?action=contact",
        },
      ],
      mobileShowMenu: false,
    });
    const goTop = () => {
      document.querySelector(`.layout__head`).scrollIntoView({
        block: "start",
        behavior: "smooth",
        inline: "center",
      });
    };
    const hover = (item) => {
      /* 沒有下拉選單則直接return */
      if (!item?.drops) return;
      /* 高度為0為開啟 反之 */
      if (item.height === 0) {
        item.height = item.drops.length * 40;
      } else {
        item.height = 0;
      }
    };
    const active = (item) => {
      /* 沒有底層直接前往 */
      if (!item?.drops) {
        router.push(item.path);
        shop.mobileShowMenu = false;
      }
      shop.nav.forEach((data) => {
        if (item.text === data.text) {
          data.isActive = !item.isActive;
        } else {
          data.isActive = false;
        }
      });
    };
    const toPath = (item) => {
      if (item.path) {
        router.push(item.path);
        shop.mobileShowMenu = false;
      } else if (item.link) {
        window.location.href = item.link;
      }
    };
    const setRem = () => {
      document.getElementsByTagName("html")[0].style = `font-size: 16px`;
    };
    onMounted(() => {
      setRem();
    });
    return {
      shop,
      hover,
      goTop,
      active,
      toPath,
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: "微軟正黑體", Microsoft JhengHei, Tahoma, Geneva, Verdana,
    sans-serif;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.layout__head {
  position: relative;
  display: flex;
  border-bottom: 0.5px solid #cdcdcd;
  z-index: 10;
  .head__logo {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 211px;
    height: 73px;
    // background: #e70012;
    background: url("@/assets/images/logo.jpeg");
    img {
      width: 60px;
      border-radius: 10px;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: #fff;
    }
    a {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    // #e70012
  }
  .head__nav {
    display: flex;
    width: calc(100% - 211px);
    li {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16.6%;
      font-size: 1.2rem;
      border-right: 0.5px solid #cdcdcd;
      cursor: pointer;
      .drop {
        // display: none;
        position: absolute;
        top: 73px;
        width: 100%;
        border-left: 0.5px solid #cdcdcd;
        border-right: 0.5px solid #cdcdcd;
        border-bottom: 0.5px solid #cdcdcd;
        background: #fff;
        font-size: 1rem;
        box-sizing: border-box;
        transition: all 0.7s;
        overflow: hidden;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem 0;
          color: #000;
          cursor: pointer;
          &:link,
          &:visited {
            color: #000;
          }
          &:hover {
            color: #e70012;
          }
          // &:nth-child(1){
          //     padding-top: 1rem;
          // }
        }
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: none;
        width: 100%;
        height: 3px;
        background-color: #e70012;
      }
      &:hover::after {
        display: block;
      }
      // &:hover {
      //     .drop {
      //         // display: block;
      //         transition: all 1s;
      //         height: inherit;
      //     }
      // }
    }
    // li::after {
    //     width: 100%;
    //     height: 5px;
    //     background-color: #e70012;
    // }
  }
  .head__nav__mobile {
    display: none;
    // display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2.5px;
    width: 40px;
    cursor: pointer;
    span {
      position: relative;
      display: block;
      width: 70%;
      height: 2px;
      background: #747474;
      transition: all 0.3s;
      border-radius: 20px;
    }
    .stuffing {
      margin: 8px 0;
    }
    &.active {
      .top__bun {
        top: 2px;
        transform: rotate(-45deg);
        width: 50%;
      }
      .stuffing {
        width: 65%;
        transform: translateX(5px);
      }
      .bottom__bun {
        bottom: 2px;
        transform: rotate(45deg);
        width: 50%;
      }
    }
  }
  .mobile__nav {
    // 做動畫要隱藏的話不可以使用display:none 而是使用visibility
    visibility: hidden;
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    color: #747474;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    // transform: translateX(-100%);
    &.active {
      visibility: visible;
      .mobile__nav__list,
      .mobile__nav__btn {
        transform: translateX(0);
      }
    }
    &__list {
      width: 70%;
      height: 100%;
      transform: translateX(-100vw);
      background: #fff;
      transition: all 0.5s;
      .title {
        padding: 1rem;
        padding-top: 2rem;
        font-weight: bold;
        border-bottom: 1px solid #cdcdcd;
      }

      ul {
        li {
          // padding: 0.7rem 0;
          padding-right: 0;
          &.active {
            background: #e70012;
            color: #fff;
          }
          .item {
            padding: 0.7rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .icon {
            display: block;
            width: 1.8rem;
            height: 0.8rem;
            background: url("@/assets/images/arrow_right.svg");
            background-repeat: no-repeat;
            background-size: cover;
            &.active {
              // transform: rotate(180deg);
              background: url("@/assets/images/arrow_down.svg");
            }
          }
          .drop {
            color: #747474;
            a {
              display: block;
              padding: 0.7rem 1rem;
              background: #efefef;
              border-top: 1px solid #fff;
              &:nth-child(1) {
                border-top: none;
              }
            }
          }
        }
      }
    }
    &__btn {
      position: relative;
      margin-left: 1rem;
      width: 45px;
      height: 45px;
      transform: translateX(-100vw);
      transition: all 0.5s;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        // left: 50%;
        width: 60%;
        height: 2px;
        transform: rotate(-45deg);
        background: #fff;
      }
      &::after {
        content: "";
        top: 50%;
        // left: 50%;
        width: 60%;
        height: 2px;
        position: absolute;
        transform: rotate(45deg);
        background: #fff;
      }
    }
  }
}

.layout__footer {
  .footer__line {
    display: flex;
    flex-direction: row-reverse;
    padding: 0 0.2rem;
    background: #e70012;
    &__gotop {
      width: 50px;
      height: 50px;
      background-image: url("@/assets/images/gotop.png");
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
  .footer__main {
    padding: 0 1rem;
    background: #f2f2f2;
    .promote {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 1.5rem 0;
      border-bottom: 1px solid #e6e6e6;
      .name {
        padding-right: 1rem;
        font-size: 22px;
        color: #303030;
        font-weight: bold;
        line-height: 1.7;
      }
      ul {
        display: flex;
        align-items: center;
        li {
          position: relative;
          display: flex;
          align-items: center;
          a {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .text {
            margin-left: 0.5rem;
            margin-right: 1rem;
          }
          .icon {
            // background-image: url("@/assets/images/gotop.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 40px;
            height: 40px;
          }
          .icon.you {
            background-image: url("@/assets/images/footer_social_youtube.png");
          }
          .icon.lin {
            background-image: url("@/assets/images/footer_social_line.png");
          }
          .icon.fb {
            background-image: url("@/assets/images/footer_social_facebook.png");
          }
          .icon.ig {
            background-image: url("@/assets/images/footer_social_ig.png");
          }
        }
      }
    }
    .link {
      display: flex;
      padding: 1.5rem 0;
      ul {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 70%;
      }
      .title {
        color: #303030;
        font-weight: bold;
        padding: 0 0.3rem;
        border-left: 3px solid #e70012;
      }
      .list {
        padding: 0 0.3rem;
        a {
          display: block;
          padding: 0.3rem 0;
        }
      }
      &__contact {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 30%;
        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        a {
          display: block;
        }
        .icon {
          background-repeat: no-repeat;
          background-size: cover;
          width: 40px;
          height: 40px;
          &.store {
            background-image: url("@/assets/images/footer_mid_right_icon_1.png");
          }
          &.service {
            background-image: url("@/assets/images/footer_mid_right_icon_2.png");
          }
        }
      }
    }
  }
}
// 標題模板
.articleModule {
  .moduleTitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    .text {
      font-size: 1.2rem;
      &.en {
        font-size: 0.8rem;
      }
    }
    .line {
      margin: 0.6rem 0;
      width: 1rem;
      height: 2px;
      background: #e70012;
    }
  }
}

@media (max-width: 980px) {
  .layout__head {
    .head__logo {
      width: 145px;
      height: 51px;
      background-size: cover;
      img {
        width: 40px;
      }
      &::after {
        display: none;
      }
    }
    .head__nav {
      display: none;
    }
    .head__nav__mobile {
      display: flex;
    }
  }
  .layout__footer {
    .footer__main {
      .promote {
        justify-content: center;
        ul {
          li {
            .text {
              display: none;
            }
            .icon {
              margin-right: 1rem;
            }
          }
        }
      }
      .link {
        flex-direction: column-reverse;
        &__contact {
          margin-top: 1rem;
          margin-bottom: 2rem;
          width: 100% !important;
        }
        ul {
          width: 100% !important;
        }
      }
    }
  }
}

// @media (max-width: 720px) {

// }
</style>
