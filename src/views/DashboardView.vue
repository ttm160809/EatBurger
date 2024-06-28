<template>
  <AdminAside></AdminAside>
  <main class="aside-main">
    <RouterView></RouterView>
  </main>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';

import sweetAlertStore from '@/stores/sweetAlertStore';

import AdminAside from '@/components/AdminAside.vue';

const { VITE_URL } = import.meta.env;
const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
axios.defaults.headers.common.Authorization = myToken;

export default {
  methods: {
    ...mapActions(sweetAlertStore, ['checkError']),
    checkLogin() { /* 判斷登入狀態 */
      this.$http.post(`${VITE_URL}/v2/api/user/check`)
        .then(() => {
        })
        .catch(() => {
          this.$router.push('/login');
          this.checkError();
        });
    },
  },
  created() {
    this.checkLogin();
  },
  components: {
    AdminAside,
  },
};
</script>

<style scoped></style>
