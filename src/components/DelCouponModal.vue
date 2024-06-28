<template>
  <div id="delCouponModal" ref="modal" class="modal fade" tabindex="-1"
       aria-labelledby="delCouponModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h2 id="delCouponModalLabel" class="modal-title fs-4">
            クーポン削除
          </h2>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-start">
          クーポン <span class="text-danger">{{ tempCoupon.title }}</span> を削除しますか
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            キャンセル
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('delete-coupon')">
            削除
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
  },
  data() {
    return {
      modal: null,
    };
  },
  emits: ['delete-Coupon'],
  mixins: [modalMixin],
};
</script>
