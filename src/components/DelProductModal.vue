<template>
  <div id="delProductModal" ref="modal" class="modal fade" tabindex="-1"
       aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h2 id="delProductModalLabel" class="modal-title fs-4">
            商品削除
          </h2>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-start">
          商品 <span class="text-danger">{{ tempProduct.title }}</span> を削除しますか
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            キャンセル
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('delete-product')">
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
    tempProduct: {},
  },
  data() {
    return {
      modal: null,
    };
  },
  emits: ['delete-product'],
  mixins: [modalMixin],
};
</script>
