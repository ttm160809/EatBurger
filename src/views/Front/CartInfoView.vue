<template>
  <div class="container pt-5">
    <div class="d-flex flex-column d-md-none align-items-center mb-5">
      <div class="border border-secondary bg-secondary w-100 text-center py-2">
        <sapn class="fs-4 text-white">1.カート</sapn>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-down-fill fs-1 text-secondary"></i>
      </div>
      <div class="border border-primary bg-primary w-100 text-center py-2">
        <sapn class="fs-4 text-white">2.ご購入手続き</sapn>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-down-fill fs-1 text-primary"></i>
      </div>
      <div class="border border-primary w-100 text-center py-2">
        <sapn class="fs-4">3.ご注文完了</sapn>
      </div>
    </div>
    <div class="d-none d-md-flex justify-content-center mb-5">
      <div class="border border-secondary bg-secondary px-5 py-4">
        <sapn class="fs-4 text-white">1.カート</sapn>
      </div>
      <div class="d-flex align-items-center mx-2">
        <i class="bi bi-caret-right-fill fs-1 text-secondary"></i>
      </div>
      <div class="border border-primary bg-primary px-5 py-4">
        <sapn class="fs-4 text-white">2.ご購入手続き</sapn>
      </div>
      <div class="d-flex align-items-center mx-2">
        <i class="bi bi-caret-right-fill fs-1 text-primary"></i>
      </div>
      <div class="border border-primary px-5 py-4">
        <sapn class="fs-4">3.ご注文完了</sapn>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="bg-white p-3 mb-3 mb-md-0">
          <div class="mb-3">
            <h2>お客様情報</h2>
          </div>
          <div class="row justify-content-center">
            <!-- v-slot把元件本身功能提取出來使用 -->
            <VForm ref="form" v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                <label for="name" class="form-label">お名前</label>
                <v-field id="name" name="お名前" type="text" v-model="form.user.name"
                         class="form-control" :class="{ 'is-invalid': errors['お名前'] }"
                         placeholder="お名前を入力" rules="required"></v-field>
                <error-message name="お名前" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">お届け先</label>
                <v-field id="address" name="お届け先" type="text" v-model="form.user.address"
                         class="form-control" :class="{ 'is-invalid': errors['お届け先'] }"
                         placeholder="お届け先を入力" rules="required"></v-field>
                <error-message name="お届け先" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">メールアドレス</label>
                <!-- rules加入所需要的規則 -->
                <VField id="email" name="メールアドレス" type="email" v-model="form.user.email"
                        class="form-control" :class="{ 'is-invalid': errors['メールアドレス'] }"
                        placeholder="メールアドレスを入力" rules="email|required"></VField>
                <!-- 需與VField的name欄位進行對應 -->
                <!-- invalid-feedback需搭配VField的is-invalid -->
                <error-message name="メールアドレス" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">携帯電話番号</label>
                <v-field id="tel" name="携帯電話番号" type="text" v-model="form.user.tel"
                          class="form-control" :class="{ 'is-invalid': errors['携帯電話番号'] }"
                          placeholder="携帯電話番号を入力" :rules="isPhone"></v-field>
                <error-message name="携帯電話番号" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">備考欄</label>
                <textarea id="message" class="form-control" cols="30"
                          rows="10" v-model="form.message"></textarea>
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-danger">注文を確認する</button>
              </div>
            </VForm>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bg-dark p-2">
          <h3 class="text-center text-white">ご注文概要</h3>
        </div>
        <div class="bg-white p-3">
          <table class="table align-middle mb-2">
            <thead></thead>
            <tbody>
              <tr v-for="cart in carts" :key="cart.id">
                <td>
                  <span class="text-primary fw-bold fs-6">
                    {{ cart.product.title }}
                  </span>
                </td>
                <td class="text-danger fs-5 text-end">x {{ cart.qty }}</td>
                <td class="text-change fw-bold fs-5 text-end">
                  ¥ {{ Math.round(cart.final_total) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="final_total === total"
               class="d-flex justify-content-between align-items-end mb-4">
            <h4 class="fw-bold">合計</h4>
            <span class="text-danger fw-bold fs-5">¥ {{ total }}</span>
          </div>
          <div v-else class="mt-3">
            <div class="d-flex justify-content-between align-items-end mb-1">
              <h4 class="fw-bold fs-5"><del>合計</del></h4>
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
                    @click="useCoupon(coupon)" >
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
        <RouterLink to="/cart">
          <button type="button" class="btn btn-primary w-100 py-3 rounded-0">
            <span class="text-warning fw-bold fs-5">カートへ戻る</span>
          </button>
        </RouterLink>
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
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      coupon: '',
    };
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    ...mapActions(sweetAlertStore, ['swalError']),
    ...mapActions(sweetAlertStore, ['successToast']),
    ...mapActions(sweetAlertStore, ['errorToast']),
    createOrder() {
      const order = this.form;
      this.$http.post(`${VITE_URL}/v2/api/${VITE_NAME}/order`, { data: order })
        .then((res) => {
          this.$refs.form.resetForm();
          this.form.message = '';
          this.getCarts();
          this.$router.push(`/cartfinish/${res.data.orderId}`);
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    isPhone(value) {
      const phoneNumber = /^(0)[0-9]{11}$/;
      if (value === '') {
        return '携帯電話番号は必須項目です';
      }
      return phoneNumber.test(value) ? true : '有効な携帯電話番号ではありません';
    },
    useCoupon(coupon) {
      const couponData = {
        code: coupon,
      };
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
    },
  },
  computed: {
    ...mapState(cartStore, ['carts']),
    ...mapState(cartStore, ['final_total']),
    ...mapState(cartStore, ['total']),
  },
};
</script>

<style scoped></style>
