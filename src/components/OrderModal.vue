<template>
  <div class="modal fade" id="orderModal" tabindex="-1"
       role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <button type="button" class="btn-close btn-close-white"
                  data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>お客様情報</h3>
              <table class="table mb-2">
                <tbody v-if="editOrder.user">
                  <tr>
                    <th>注文番号</th>
                    <td>{{ editOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>注文日時</th>
                    <td>{{ create_at }}</td>
                  </tr>
                  <tr>
                    <th>お名前</th>
                    <td>{{ editOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>携帯電話番号</th>
                    <td>{{ editOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>メールアドレス</th>
                    <td>{{ editOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>お届け先</th>
                    <td>{{ editOrder.user.address }}</td>
                  </tr>
                  <tr>
                    <th>備考欄</th>
                    <td>{{ editOrder.message }}</td>
                  </tr>
                  <tr>
                    <th>お支払い状況</th>
                    <td>
                      <strong v-if="editOrder.is_paid" class="text-success">お支払い済み</strong>
                      <span v-else class="fw-bold text-danger">ご請求中</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="form-check d-flex justify-content-end">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                       v-model="editOrder.is_paid" />
                <label class="form-check-label" for="flexCheckDefault">
                  <span v-if="editOrder.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </div>
            <div class="col-md-8">
              <h3>注文内容</h3>
              <table class="table mb-2">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in editOrder.products" :key="item.id">
                    <th>{{ item.product.title }}</th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">{{ Math.round(item.final_total) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end">
                <span class="text-danger fw-bold fs-3 me-4">合計</span>
                <span class="text-danger fw-bold fs-4 me-2">¥ {{ tempOrder.total }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            キャンセル
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-paid', this.paid)">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    tempOrder: {
      type: Object,
      default() {
        return {
        };
      },
    },
  },
  data() {
    return {
      modal: null,
      create_at: '',
      status: {},
      editOrder: {},
    };
  },
  methods: {
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
  },
  watch: {
    tempOrder() {
      this.editOrder = this.tempOrder;
      this.create_at = this.switchDate(this.tempOrder.create_at);
    },
  },
  emits: ['update-paid'],
  mixins: [modalMixin],
};
</script>
