<template>
  <div id="shopModal" class="modal fade" ref="modal"  tabindex="-1"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button type="button" data-bs-dismiss="modal" aria-label="Close"
                class="btn-close position-absolute p-2 m-2 top-0 end-0
                       rounded-circle bg-opacity-90 bg-white">
        </button>
        <div class="modal-header p-0 overflow-hidden">
          <img :src="editProduct.imageUrl" class="card-img-top rounded-0 "
               style="object-fit: cover;" height="300" alt="...">
        </div>
        <div class="modal-body">
          <div class="product-detail row align-content-between">
            <div class="mb-2">
              <h2 class="fw-bold h1 mb-1 text-primary">{{ editProduct.title }}</h2>
              <span class="my-1">{{ editProduct.description }}</span>
            </div>
            <div class="card-text mb-0">
              <span class="fw-bold fs-4 me-1 text-change">¥ {{ editProduct.price }}</span>
              <span class="text-muted "><del>¥ {{ editProduct.origin_price }}</del></span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="col">
            <div class="input-group">
              <select name="" id="" class="form-select" v-model="qty" ref="qtyValue">
                <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
              </select>
            </div>
          </div>
          <div class="col text-end">
            <button type="button" class="btn btn-primary text-white"
                    @click.prevent="addAndHide(editProduct.id, this.$refs.qtyValue.value)">
              <i class="bi bi-cart-fill me-1"></i>
              カートに入れる
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import cartStore from '@/stores/cartStore';
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    tempProduct: {},
  },
  data() {
    return {
      modal: null,
      editProduct: {},
      qty: 1,
    };
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    addAndHide(id, value) {
      this.addToCart(id, value);
      this.hideModal();
      this.qty = 1;
    },
  },
  /* 監聽tempProduct，當tempProduct發生改變時重新賦予editProduct */
  watch: {
    tempProduct() {
      this.editProduct = this.tempProduct;
    },
  },
  mixins: [modalMixin],
};
</script>
