<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="container p-3">
    <h2 class="mb-2">クーポン管理</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        <i class="bi bi-plus"></i>
        新規作成
      </button>
    </div>
    <table class="table mt-4 align-middle">
      <thead class="table-primary">
        <tr class="my-2">
          <th>クーポン名</th>
          <th>クーポンコード</th>
          <th>割引</th>
          <th>有効期限</th>
          <th>使用状態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for ="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td>{{ 100 - coupon.percent }} %引</td>
          <td :class="{ 'text-danger': coupon.due_date <= this.timestamp,
                        'fw-bold': coupon.due_date <= this.timestamp }">
            {{ switchDate(coupon.due_date) }}
          </td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                     :checked="coupon.is_enabled" @change="changeIsEnabled(coupon)">
              <label class="form-check-label" for="flexSwitchCheckDefault">
                <span class="text-success" v-if = "coupon.is_enabled">アクティベート</span>
                <span v-else>インアクティブ</span>
              </label>
            </div>
          </td>
          <td class="text-end">
            <div class="btn-group me-4">
              <button type="button" class="btn btn-change btn-sm py-2"
                      @click="openModal('edit', coupon)">
                <i class="bi bi-pencil-fill mx-2"></i>
              </button>
              <button type="button" class="btn btn-danger btn-sm py-2"
                      @click="openModal('del', coupon)">
                <i class="bi bi-trash3-fill mx-2"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationCard :pages="pages"
                    :get-coupons="getCoupons">
    </PaginationCard>
  </div>
  <CouponModal :temp-coupon="tempCoupon"
               @update-coupon="updateCoupon"
               :is-new="isNew"
               ref="cModal">
  </CouponModal>
  <DelCouponModal :temp-coupon="tempCoupon"
                  @delete-coupon="deleteCoupon"
                  ref="dModal">
  </DelCouponModal>
</template>

<script>
import { mapActions } from 'pinia';

import sweetAlertStore from '@/stores/sweetAlertStore';

import CouponModal from '@/components/CouponModal.vue';
import DelCouponModal from '@/components/DelCouponModal.vue';
import PaginationCard from '@/components/PaginationCard.vue';

const { VITE_URL, VITE_NAME } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      coupons: [],
      pages: {
      },
      isNew: false,
      tempCoupon: {},
      timestamp: '',
    };
  },
  methods: {
    ...mapActions(sweetAlertStore, ['swalError']),
    ...mapActions(sweetAlertStore, ['successToast']),
    ...mapActions(sweetAlertStore, ['errorToast']),
    getCoupons() {
      this.isLoading = true;
      this.$http.get(`${VITE_URL}/v2/api/${VITE_NAME}/admin/coupons`)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pages = res.data.pagination;
          this.timestamp = Math.floor(new Date().getTime() / 1000);
          this.isLoading = false;
        })
        .catch(() => {
          this.swalError();
        });
    },
    openModal(status, item) {
      if (status === 'new') {
        this.isNew = true;
        this.tempCoupon = {
          is_enabled: 0,
        };
        this.$refs.cModal.openModal();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempCoupon = { ...item };
        this.tempCoupon.due_date = this.switchDate(this.tempCoupon.due_date);
        this.$refs.cModal.openModal();
      } else if (status === 'del') {
        this.tempCoupon = { ...item };
        this.$refs.dModal.openModal();
      }
    },
    updateCoupon() {
      let updateStatus = 'post'; /* 先設定上傳變數 */
      let message = 'クポーンデータが作成されました';
      let updateUrl = `${VITE_URL}/v2/api/${VITE_NAME}/admin/coupon`;

      if (this.isNew === false) { /* 若is.New為false則updateStatus值變為put，以啟動put的api來上傳新商品 */
        updateStatus = 'put';
        message = 'アップデートしました';
        updateUrl = `${VITE_URL}/v2/api/${VITE_NAME}/admin/coupon/${this.tempCoupon.id}`;
      }

      if (this.tempCoupon.percent <= 0 || this.tempCoupon.percent >= 101) {
        this.errorToast('1~100までの整数値を入力してください');
        return;
      }

      this.tempCoupon.percent = Number(this.tempCoupon.percent);
      this.tempCoupon.due_date = new Date(this.tempCoupon.due_date).getTime() / 1000;

      this.$http[updateStatus](updateUrl, { data: this.tempCoupon })
        .then(() => {
          this.$refs.cModal.hideModal();
          this.getCoupons();
          this.successToast(message);
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    deleteCoupon() {
      this.$http.delete(`${VITE_URL}/v2/api/${VITE_NAME}/admin/Coupon/${this.tempCoupon.id}`, { data: this.tempCoupon })
        .then(() => {
          this.$refs.dModal.hideModal();
          this.getCoupons();
          this.successToast('クポーンが削除されました');
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    changeIsEnabled(coupon) {
      this.tempCoupon = { ...coupon };
      this.tempCoupon.is_enabled = Math.abs(coupon.is_enabled - 1);
      this.$http.put(`${VITE_URL}/v2/api/${VITE_NAME}/admin/coupon/${this.tempCoupon.id}`, { data: this.tempCoupon })
        .then(() => {
          this.getCoupons();
          if (this.tempCoupon.is_enabled === 1) {
            this.successToast('クポーンがアクティベートされました');
          } else {
            this.successToast('クポーンがインアクティブされました');
          }
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    switchDate(timestamp) {
      // 當使用不同的JavaScript方法來生成時間戳時，它們會返回自 1970 年 1 月 1 日 UTC（Unix 時間）以來所經的毫秒數(13位數)。
      // 参数需要毫秒数，所以这里将秒数乘于 1000
      const date = new Date(timestamp * 1000);
      // toISOString()方法使用 ISO 標準傳回 Date 物件的字串格式
      // slice() 方法可以任意截取出陣列的一部分
      // 參數 begin 表示開始擷取的索引位置 (索引值從 0 開始)，預設是 0
      // 參數 end 表示結束擷取的索引位置，擷取的範圍不包含 end 元素；如果 end 是負數，表示從陣列後面算起，例如 -1 表示最後一個元素的位置
      const formattedDate = date.toISOString().slice(0, 10);
      return formattedDate;
    },
  },
  mounted() {
    this.getCoupons();
  },
  components: {
    PaginationCard,
    CouponModal,
    DelCouponModal,
  },
};
</script>

<style scoped></style>
