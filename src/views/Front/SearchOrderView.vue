<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="container pt-5">
    <div class="row justify-content-center mb-5">
      <div class="col-md-8 d-flex flex-column align-items-center">
        <h2 class="fs-1 fw-bold mb-5">注文検索</h2>
        <div class="input-group mb-5">
          <input type="text" class="form-control" placeholder="ご注文番号を入力" v-model="order_id"
                 aria-label="ご注文番号を入力" aria-describedby="button-addon2">
          <button class="btn btn-dark" type="button" id="button-addon2"
                  @click="getOrder">
            注文を照会する
          </button>
        </div>
      </div>
      <div v-if="isSearch === true && tempOrder === null"
           class="d-flex flex-column align-items-center">
        <i class="bi bi-clipboard-x-fill fs-8r text-secondary"></i>
        <span class="fs-3 mb-4 text-secondary">ご注文番号が正しくありません</span>
      </div>
      <div v-else-if="isSearch === true && tempOrder !== null" class="col-md-10">
        <div class="row d-flex flex-column-reverse flex-md-row">
          <div class="col-md-7">
            <div class="bg-white p-3">
              <h2>ご注文内容</h2>
              <table class="table align-middle mb-2">
                <thead></thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <td class="d-flex flex-column-reverse d-md-block">
                      <img :src="item.product.imageUrl"
                            class="cart-list-img card-img-top rounded-0" alt="...">
                      <span class="text-primary fw-bold fs-6 ms-0 ms-md-3">
                        {{ item.product.title }}
                      </span>
                    </td>
                    <td class="text-danger fs-5 text-end">x {{ item.qty }}</td>
                    <td class="text-change fw-bold fs-5 text-end">
                      ¥ {{ Math.round(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end">
                <span class="text-danger fw-bold fs-3 me-4">合計</span>
                <span class="text-danger fw-bold fs-4 me-2">¥ {{ tempOrder.total }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-5 mb-3 mb-md-0">
            <div class="bg-dark p-2">
              <h3 class="text-center text-white">お客様情報</h3>
            </div>
            <div class="bg-white p-3">
              <table class="table mb-2">
                <thead></thead>
                <tbody>
                  <tr>
                    <th>ご注文番号</th>
                    <td class="text-end">{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>注文日時</th>
                    <td class="text-end">{{ switchDate(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>お名前</th>
                    <td class="text-end">{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>携帯電話番号</th>
                    <td class="text-end">{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>メールアドレス</th>
                    <td class="text-end">{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>お届け先</th>
                    <td class="text-end">{{ tempOrder.user.address }}</td>
                  </tr>
                  <tr>
                    <th>備考欄</th>
                    <td v-if="tempOrder.message === undefined" class="text-end">-</td>
                    <td v-else class="text-end">{{ tempOrder.message }}</td>
                  </tr>
                  <tr>
                    <th>お支払い状況</th>
                    <td v-if="tempOrder.is_paid === true"
                        class="text-success text-end fw-bold">お支払い済み</td>
                    <td v-else class="text-danger text-end fw-bold">ご請求中</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end">
                <button class="btn btn-change" type="button" id="button-addon2"
                        @click="checkPaid()">
                  決済する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import sweetAlertStore from '@/stores/sweetAlertStore';

const { VITE_URL, VITE_NAME } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      isSearch: false,
      tempOrder: [],
      order_id: '',
    };
  },
  methods: {
    ...mapActions(sweetAlertStore, ['swalError']),
    ...mapActions(sweetAlertStore, ['successToast']),
    ...mapActions(sweetAlertStore, ['errorToast']),
    getOrder() {
      if (this.order_id !== '') {
        this.isLoading = true;
        this.$http.get(`${VITE_URL}/v2/api/${VITE_NAME}/order/${this.order_id}`)
          .then((res) => {
            this.tempOrder = res.data.order;
            this.isSearch = true;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
            this.swalError();
          });
      }
    },
    switchDate(timestamp) {
      const date = new Date(timestamp * 1000);
      let Y = `${date.getFullYear()}-`;
      // date.getMonth()返回日期對應的月份，範圍從 0 到 11，所以需要加 1 才能得到正確的月份。
      let M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
      let D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
      let h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
      let m = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
      let formattedDate = Y + M + D + h + m;
      return formattedDate;
    },
    checkPaid() {
      if (this.tempOrder.is_paid === false) {
        this.$http.post(`${VITE_URL}/v2/api/${VITE_NAME}/pay/${this.tempOrder.id}`)
          .then(() => {
            this.getOrder();
            this.successToast('お支払いが完了しました');
          })
          .catch(() => {
            this.errorToast('お手数ですが、もう一度やり直してください');
          });
      }
    },
  },
};
</script>

<style scoped></style>
