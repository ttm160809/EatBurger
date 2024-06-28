<template>
  <div class="container pt-5">
    <div class="d-flex flex-column d-md-none align-items-center mb-5">
      <div class="border border-primary bg-primary w-100 text-center py-2">
        <sapn class="fs-4 text-white">1.カート</sapn>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-down-fill fs-1 text-primary"></i>
      </div>
      <div class="border border-primary w-100 text-center py-2">
        <sapn class="fs-4">2.ご購入手続き</sapn>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-down fs-1 text-primary"></i>
      </div>
      <div class="border border-primary w-100 text-center py-2">
        <sapn class="fs-4">3.ご注文完了</sapn>
      </div>
    </div>
    <div class="d-none d-md-flex justify-content-center mb-5">
      <div class="border border-primary bg-primary px-5 py-4">
        <sapn class="fs-4 text-white">1.カート</sapn>
      </div>
      <div class="d-flex align-items-center mx-2">
        <i class="bi bi-caret-right-fill fs-1 text-primary"></i>
      </div>
      <div class="border border-primary px-5 py-4">
        <sapn class="fs-4">2.ご購入手続き</sapn>
      </div>
      <div class="d-flex align-items-center mx-2">
        <i class="bi bi-caret-right fs-1 text-primary"></i>
      </div>
      <div class="border border-primary px-5 py-4">
        <sapn class="fs-4">3.ご注文完了</sapn>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="bg-white p-3 mb-3 mb-md-0">
          <div class="d-flex justify-content-between mb-3">
            <h2>カート内の商品</h2>
            <button class="btn btn-outline-danger" type="button"
                    @click="deleteAllCart" :disabled="carts.length === 0">
              <i class="cart-delete bi bi-trash3-fill rounded me-1 fs-6"></i>
              全て削除
            </button>
          </div>
          <div v-if="carts.length === 0" class="text-center mb-4">
            <i class="bi bi-cart-x-fill fs-8r text-secondary"></i>
            <h3 class="mb-4 text-secondary">現在カートには商品がございません</h3>
            <RouterLink to="/products">
              <button type="button" class="btn btn-primary fs-3 py-2 px-5">
                <span class="text-white">注文する</span>
              </button>
            </RouterLink>
          </div>
          <table v-else class="cart-list table align-middle">
            <tbody>
              <tr v-for="cart in carts" :key="cart.id" class="my-1">
                <td class="me-3">
                  <button class="btn btn-outline-danger" type="button"
                          @click="deleteCart(cart)" :disabled="carts.length === 0">
                    <i class="cart-delete bi bi-trash3-fill rounded fs-6"></i>
                  </button>
                </td>
                <td class="d-flex flex-column-reverse d-md-block">
                  <img :src="cart.product.imageUrl"
                       class="cart-list-img rounded-0" alt="...">
                  <span class="text-primary fw-bold fs-6 ms-0 ms-md-3">
                    {{ cart.product.title }}
                  </span>
                </td>
                <td class="text-end text-change fw-bold fs-5">
                  <div class="d-md-flex">
                    <select name="" id="" class="form-select mb-3 mb-md-0"
                            v-model="cart.qty" @change="changeCartQty(cart)">
                      <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                    </select>
                    <span class="w-100 ms-0 ms-md-5 align-middle">¥ {{ cart.total }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bg-dark p-2">
          <h2 class="text-center text-white">ご注文概要</h2>
        </div>
        <div class="bg-white p-3">
          <div v-if="final_total === total"
               class="d-flex justify-content-between align-items-end mb-4">
            <h3 class="fw-bold">合計</h3>
            <span class="text-danger fw-bold fs-5">¥ {{ total }}</span>
          </div>
          <div v-else>
            <div class="d-flex justify-content-between align-items-end mb-1">
              <h3 class="fw-bold fs-5"><del>合計</del></h3>
              <span class="text-danger fw-bold fs-6"><del>¥ {{ total }}</del></span>
            </div>
            <div class="d-flex justify-content-between align-items-end mb-4">
              <h4 class="fw-bold fs-4">クーポン適用後合計</h4>
              <span class="text-danger fw-bold fs-4">¥ {{ Math.round(final_total) }}</span>
            </div>
          </div>
          <div v-if="final_total === total" class="input-group mb-3">
            <input type="text" class="form-control" placeholder="クーポンコードを入力" v-model="coupon"
                   aria-label="クーポンコードを入力" aria-describedby="button-addon"
                   :disabled="carts.final_total !== carts.total">
            <button class="btn btn-dark" type="button" id="button-addon"
                    @click="useCoupon(coupon)">
              適用
            </button>
          </div>
          <div v-else class="input-group mb-3">
            <input type="text" class="form-control" placeholder="クーポンが適用されました" v-model="coupon"
                   aria-label="クーポンが適用されました" aria-describedby="button-addon2" disabled>
            <button class="btn btn-dark" type="button" id="button-addon2" disabled>
              適用
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-primary w-100 py-3 rounded-0" @click="checkCart">
          <span class="text-warning fw-bold fs-5">ご購入手続きへ進む</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import cartStore from '@/stores/cartStore';
import sweetAlertStore from '@/stores/sweetAlertStore';

const { VITE_URL, VITE_NAME } = import.meta.env;

export default {
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    ...mapActions(cartStore, ['deleteAllCart']),
    ...mapActions(cartStore, ['deleteCart']),
    ...mapActions(cartStore, ['changeCartQty']),
    ...mapActions(sweetAlertStore, ['successToast']),
    ...mapActions(sweetAlertStore, ['errorToast']),
    useCoupon(coupon) {
      const couponData = {
        code: coupon,
      };
      if (this.carts.length > 0) {
        this.$http.post(`${VITE_URL}/v2/api/${VITE_NAME}/coupon`, { data: couponData })
          .then(() => {
            this.getCarts();
            this.coupon = '';
            this.successToast('クーポンを使用しました');
          })
          .catch(() => {
            this.coupon = '';
            this.errorToast('クーポンコードが正しくありません');
          });
      } else {
        this.errorToast('現在カートには商品がございません');
      }
    },
    checkTotal() {
      const couponData = {
        code: 'OPEN30',
      };
      for (let i = 0; i < this.carts.length; i += 1) {
        if (this.carts[i].coupon === undefined && this.final_total !== this.total) {
          this.$http.post(`${VITE_URL}/v2/api/${VITE_NAME}/coupon`, { data: couponData })
            .then(() => {
              this.getCarts();
            })
            .catch(() => {
              this.coupon = '';
            });
        }
      }
    },
    checkCart() {
      if (this.carts.length > 0) {
        this.$router.push('/cartInfo');
      } else {
        this.errorToast('現在カートには商品がございません');
      }
    },
  },
  mounted() {
    this.checkTotal();
  },
  computed: {
    ...mapState(cartStore, ['carts']),
    ...mapState(cartStore, ['final_total']),
    ...mapState(cartStore, ['total']),
  },
};
</script>

<style scoped></style>
