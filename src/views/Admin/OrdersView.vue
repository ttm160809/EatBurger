<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="container p-3">
    <h2 class="mb-2">注文管理</h2>
    <table class="table mt-4 align-middle">
      <thead class="table-primary">
        <tr>
          <th>注文日時</th>
          <th>メールアドレス</th>
          <th>注文内容</th>
          <th>合計</th>
          <th>お支払い状況</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for ="order in orders" :key="order.id">
          <td>{{ switchDate(order.create_at) }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(order, i) in order.products" :key="i">
                <span class="fw-bold text-danger">{{ order.qty }} x</span>
                {{ order.product.title }}
              </li>
            </ul>
          </td>
          <td>{{ order.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                     :checked="order.is_paid" @change="changeIspaid(order)">
              <label class="form-check-label" for="flexSwitchCheckDefault">
                <span class="text-success" v-if = "order.is_paid">支払い済み</span>
                <span class="fw-bold text-danger" v-else >請求中</span>
              </label>
            </div>
          </td>
          <td class="text-end">
            <div class="btn-group me-4">
              <button type="button" class="btn btn-change btn-sm py-2"
                      @click="openModal('order', order)">
                <i class="bi bi-search mx-2"></i>
              </button>
              <button type="button" class="btn btn-danger btn-sm py-2"
                      @click="openModal('del', order)">
                <i class="bi bi-trash3-fill mx-2"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationCard :pages="pages"
                    :get-orders="getOrders">
    </PaginationCard>
  </div>
  <OrderModal :temp-order="tempOrder"
              @update-paid="updatePaid"
              :switchdate="switchDate"
              ref="pModal">
  </OrderModal>
  <DelOrderModal :temp-order="tempOrder"
                  @delete-order="deleteOrder"
                  ref="dModal">
  </DelOrderModal>
</template>

<script>

import { mapActions } from 'pinia';

import sweetAlertStore from '@/stores/sweetAlertStore';

import OrderModal from '@/components/OrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import PaginationCard from '@/components/PaginationCard.vue';

const { VITE_URL, VITE_NAME } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      pages: {
      },
      isNew: false,
      tempOrder: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    ...mapActions(sweetAlertStore, ['swalError']),
    ...mapActions(sweetAlertStore, ['successToast']),
    ...mapActions(sweetAlertStore, ['errorToast']),
    getOrders(page = 1) { /* 獲取訂單資料 */
      this.isLoading = true;
      this.$http.get(`${VITE_URL}/v2/api/${VITE_NAME}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders;
          this.pages = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.swalError();
        });
    },
    openModal(status, item) { /* 開啟商品視窗 */
      if (status === 'order') { /* 編輯商品 */
        this.isNew = false;
        this.tempOrder = { ...item };
        this.$refs.pModal.openModal();
      } else if (status === 'del') { /* 刪除商品 */
        this.tempOrder = { ...item };
        this.$refs.dModal.openModal();
      }
    },
    updatePaid() {
      // 傳送格式須符合api規範
      const paid = {
        is_paid: this.tempOrder.is_paid,
      };
      this.$http.put(`${VITE_URL}/v2/api/${VITE_NAME}/admin/order/${this.tempOrder.id}`, { data: paid })
        .then(() => {
          this.$refs.pModal.hideModal();
          this.getOrders();
          this.successToast('アップデートしました');
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    deleteOrder() {
      this.$http.delete(`${VITE_URL}/v2/api/${VITE_NAME}/admin/order/${this.tempOrder.id}`, { data: this.tempOrder })
        .then(() => {
          this.$refs.dModal.hideModal();
          this.getOrders();
          this.successToast('注文が削除されました');
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
    changeIspaid(order) {
      this.tempOrder = { ...order };
      this.tempOrder.is_paid = !order.is_paid;
      const paid = {
        is_paid: this.tempOrder.is_paid,
      };
      this.$http.put(`${VITE_URL}/v2/api/${VITE_NAME}/admin/order/${this.tempOrder.id}`, { data: paid })
        .then(() => {
          this.getOrders();
          this.successToast('お支払い状況が変更されました');
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
  },
  mounted() {
    this.getOrders();
  },
  components: {
    PaginationCard,
    OrderModal,
    DelOrderModal,
  },
};
</script>
