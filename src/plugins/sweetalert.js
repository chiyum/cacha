import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Swal.showLoadings = function showLoading() {
  return this.fire({
    title: "Loading",
    // 顯示按鈕與否
    showConfirmButton: false,
    // 自定義class
    // customClass: "swal2-loading",
    // 顯示時動畫
    showClass: {
      popup: "animate__animated animate__fadeIn",
    },
    // 關閉時動畫
    hideClass: {
      popup: "animate__animated animate__fadeOut",
    },
    // alert背景顏色
    background: "#fff",
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const swal = Swal.mixin({
  reverseButtons: true,
  heightAuto: false,
  focusConfirm: false,
  allowOutsideClick: false,
  allowEnterKey: false,
  allowEscapeKey: false,
  customClass: "swal2-wrap",
  // width: 300,
  confirmButtonText: "確定",
  cancelButtonText: "取消",
  didOpen(popup) {
    const cancelBtn = popup.querySelector(".swal2-cancel");
    const confirmBtn = popup.querySelector(".swal2-confirm");
    confirmBtn.blur();
    cancelBtn.blur();
  },
});

//這邊可以嘗試使用exprot 具名來匯出需要的樣式 如上
//預計做個確認彈窗跟等待彈窗 等待為優先

export default swal;
