import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import router from '../router';

export default defineStore('sweetAlertStore', {
  state: () => ({}),
  actions: {
    successToast(message) {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        icon: 'success',
        title: message,
      });
    },
    errorToast(message) {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        icon: 'error',
        title: message,
      });
    },
    swalError() {
      Swal.fire({
        icon: 'error',
        title: 'このページを読み込めません',
        text: 'お手数ですが、インターネット接続をご確認のうえ、もう一度お試しください',
        confirmButtonText: 'はい',
      });
    },
    checkError() {
      router.push('/login');
      Swal.fire({
        icon: 'error',
        title: 'アカウント認証に失敗しましたん',
        text: 'お手数ですが、もう一度お試しください',
        confirmButtonText: 'はい',
      });
    },
    swalSuccess(message) {
      Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2500,
      });
    },
  },
  getters: {},
});
