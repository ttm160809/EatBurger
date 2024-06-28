<template>
  <header class="header navbar navbar-expand-md navbar-light bg-primary fixed-top py-3">
    <nav class="container justify-content-start">
      <h1 class="fs-2 me-4">
        <RouterLink to="/" class="navbar-brand">
          <img src="../assets/img/Logo.png" alt="logo"
               style="object-fit: cover;" height="50" width="180"/>
        </RouterLink>
      </h1>
      <ul class="nav-list text-white d-none d-md-flex">
        <li class="position-relative">
          <RouterLink to="/products">メニュー</RouterLink>
        </li>
        <li class="position-relative">
          <RouterLink to="/SearchOrder">注文検索</RouterLink>
        </li>
        <li class="position-relative" @click.prevent="isToken()">
          <a href="">バックグラウンド</a>
        </li>
      </ul>
      <div class="cart-icon position-relative ms-auto" :disabled="this.$route.path === '/cart'">
        <RouterLink to="/cart" class="me-2">
          <i class="bi bi-cart-fill fs-2 text-white"></i>
          <span class="cart-dot translate-middle badge rounded-pill bg-change fs-6">
            <!-- ?. 可選串聯，用來精簡判斷物件是否存在時的寫法 -->
            {{ carts?.length }}
          </span>
        </RouterLink>
      </div>
      <button class="navbar-toggler nav-btn btn-black ms-4" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="nav-list collapse text-white mt-3 mt-md-0 d-md-none text-center mx-auto"
          id="navbarNav">
        <li class="position-relative" @click="closeNavbar()">
          <RouterLink to="/products">メニュー</RouterLink>
        </li>
        <li class="position-relative" @click="closeNavbar()">
          <RouterLink to="/SearchOrder">注文検索</RouterLink>
        </li>
        <li class="position-relative" @click.prevent="isToken()">
          <a href="">バックグラウンド</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import $ from 'jquery';
import { mapActions, mapState } from 'pinia';

import cartStore from '../stores/cartStore';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    closeNavbar() {
      $('.navbar-toggler').trigger('click');
    },
    isToken() { /* 點選時斷登入狀態 */
      this.$http.post(`${VITE_URL}/v2/api/user/check`)
        .then(() => {
          this.closeNavbar();
          this.$router.push('/admin/products');
        })
        .catch(() => {
          this.closeNavbar();
          this.$router.push('/login');
        });
    },
  },
  computed: {
    ...mapState(cartStore, ['carts']),
  },
  mounted() {
    this.getCarts();
  },
};
</script>
