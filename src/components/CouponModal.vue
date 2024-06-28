<template>
  <!-- 在JS中需要透過document.querySelector('#demo')來取得dom節點。
  但在vue則可在元素綁定ref後直接透過this.$refs調用，這樣也可減少取得DOM節點的消耗。 -->
  <!-- ref要與modalMixin一致 -->
  <div id="couponModal" ref="modal" class="modal fade" tabindex="-1"
       aria-labelledby="couponModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h2 id="couponModalLabel" class="modal-title fs-4">
            <!-- 條件運算式，根據 isNew 的值判斷顯示對應文字。如果 isNew 為真則顯示"新增商品"，否則顯示"編輯商品"。 -->
            {{ isNew ? "新規作成" : "クーポン編集" }}
          </h2>
          <button type="button" class="btn-close btn-close-white"
                  data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="title" class="form-label">クーポン名</label>
                <input id="title" type="text" class="form-control"
                       placeholder="クーポン名" v-model="editCoupon.title">
              </div>
              <div class="mb-3 col-md-6">
                <label for="dueDate" class="form-label">有効期限</label>
                <input id="dueDate" type="date" class="form-control"
                       v-model="editCoupon.due_date">
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="code" class="form-label">クーポンコード</label>
                <input id="code" type="text" class="form-control"
                       placeholder="クーポンコード" v-model="editCoupon.code">
              </div>
              <div class="mb-3 col-md-6">
                <label for="percent" class="form-label">
                  割引
                  <span class="text-danger fs-5 fw-bolder"
                        v-if="0 < editCoupon.percent && editCoupon.percent <= 100">
                    ({{100 - editCoupon.percent}}%引)
                  </span>
                  <span class="text-danger fs-5 fw-bolder" v-else>
                    (0%引)
                  </span>
                </label>
                <input id="percent" type="text" class="form-control"
                       placeholder="割引" v-model="editCoupon.percent">
              </div>
            </div>
            <hr>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox"
                       :true-value="1" :false-value="0" v-model="editCoupon.is_enabled">
                <label class="form-check-label" for="is_enabled">アクティベート</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            キャンセル
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', editcoupon)">
            {{ isNew ? "作成" : "保存" }}
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
    tempCoupon: {},
    updateCoupon: {},
    isNew: {},
  },
  data() {
    return {
      modal: null,
      // 因單向數據流特性，為避免動到父層tempProduct，另宣告變數
      editCoupon: {
        is_enabled: false,
      },
    };
  },
  methods: {
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
  watch: { /* 監聽tempProduct，當tempProduct發生改變時重新賦予editProduct */
    tempCoupon() {
      this.editCoupon = this.tempCoupon;
    },
  },
  emits: ['update-coupon'],
  mixins: [modalMixin],
};
</script>
