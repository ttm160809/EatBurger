<template>
  <aside class="aside-navbar py-3 h-100 position-fixed
                d-flex flex-column align-items-center">
    <img src="../assets/img/Logo2.png" alt="logo" class="my-4">
    <ul class="nav w-100 d-flex flex-column text-center">
      <li class="nav-item my-2"
          :class="{ 'page-active': activePage === 'products' }"
          @click.prevent="changeActivePage('products')">
        <i class="bi bi-bag-fill"></i>
        <RouterLink to="/admin/products" class="fs-3 link-light">商品管理</RouterLink>
      </li>
      <li class="nav-item my-2"
          :class="{ 'page-active': activePage === 'orders' }"
          @click.prevent="changeActivePage('orders')">
        <i class="bi bi-clipboard-fill"></i>
        <RouterLink to="/admin/orders" class="fs-3 link-light">注文管理</RouterLink>
      </li>
      <li class="nav-item my-2"
          :class="{ 'page-active': activePage === 'coupons' }"
          @click.prevent="changeActivePage('coupons')">
          <i class="bi bi-ticket-fill"></i>
        <RouterLink to="/admin/coupons" class="fs-3 link-light">クーポン管理</RouterLink>
      </li>
      <li class="nav-item my-2">
        <i class="bi bi-door-closed-fill"></i>
        <RouterLink to="/" class="fs-3 link-light">ホームページへ</RouterLink>
      </li>
      <li class="nav-item my-4">
        <i class="bi bi-box-arrow-right"></i>
        <a href="#" @click.prevent="signOut" class="fs-4 link-light">ログアウト</a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapActions } from 'pinia';

import sweetAlertStore from '@/stores/sweetAlertStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      activePage: this.$route.path.replace('/admin/', ''),
    };
  },
  methods: {
    ...mapActions(sweetAlertStore, ['successToast']),
    ...mapActions(sweetAlertStore, ['errorToast']),
    signOut() {
      this.$http.post(`${VITE_URL}/v2/logout`)
        .then(() => {
          this.successToast('ログアウトしました');
          document.cookie = 'hexToken=; expires=; path=/'; /* 登出時清除 cookie，只要將原先設定的值留白即可 */
          this.$router.push('/'); /* 登出成功後再將路由重新導向回前台 */
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    changeActivePage(page) {
      this.activePage = page;
    },
  },
};
</script>
