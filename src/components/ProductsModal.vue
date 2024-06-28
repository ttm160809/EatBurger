<template>
  <!-- 在JS中需要透過document.querySelector('#demo')來取得dom節點。
  但在vue則可在元素綁定ref後直接透過this.$refs調用，這樣也可減少取得DOM節點的消耗。 -->
  <!-- ref要與modalMixin一致 -->
  <div id="productModal" ref="modal" class="modal fade" tabindex="-1"
       aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h2 id="productModalLabel" class="modal-title fs-4">
            <!-- 條件運算式，根據 isNew 的值判斷顯示對應文字。如果 isNew 為真則顯示"新增商品"，否則顯示"編輯商品"。 -->
            {{ isNew ? "新規作成" : "商品編集" }}
          </h2>
          <button type="button" class="btn-close btn-close-white"
                  data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <label for="imageUrl" class="form-label">商品画像</label>
                <input type="text" class="form-control mb-2"
                       placeholder="画像URL" v-model="editProduct.imageUrl" disabled>
                <img class="img-fluid" :src="editProduct.imageUrl" alt="">
              </div>
              <div>
                <label for="customFile" class="form-label">画像選択</label>
                <input type="file" id="customFile" class="form-control"
                       ref="fileInput" @change="uploadFile"/>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">商品名</label>
                <input id="title" type="text" class="form-control"
                       placeholder="商品名" v-model="editProduct.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control"
                         placeholder="分類" v-model="editProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">ユニット</label>
                  <input id="unit" type="text" class="form-control"
                         placeholder="ユニット" v-model="editProduct.unit">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原価</label>
                  <input id="origin_price" type="number" min="0" class="form-control"
                          placeholder="原価" v-model="editProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">販売価格</label>
                  <input id="price" type="number" min="0" class="form-control"
                          placeholder="販売価格" v-model="editProduct.price">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">概要</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="概要" v-model="editProduct.description">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                         :true-value="1" :false-value="0" v-model="editProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">アクティベート</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            キャンセル
          </button>
          <button type="button" class="btn btn-primary"
                  @click="$emit('update-product', editProduct)">
            <!-- $emit 是 Vue.js 中用於觸發事件的方法，第一個參數 'update-product' 是事件的名稱，
            第二個參數 editProduct 是要傳遞的資料。當點擊時觸發名為 update-product 的自定義事件，並將 editProduct 作為參數傳遞。 -->
            {{ isNew ? "作成" : "保存" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import { mapActions } from 'pinia';

import sweetAlertStore from '@/stores/sweetAlertStore';

const { VITE_URL, VITE_NAME } = import.meta.env;

export default {
  props: {
    tempProduct: {},
    updateProduct: {},
    isNew: {},
  },
  data() {
    return {
      modal: null,
      // 因單向數據流特性，為避免動到父層tempProduct，另宣告變數
      editProduct: {},
    };
  },
  methods: {
    ...mapActions(sweetAlertStore, ['errorToast']),
    uploadFile() {
      // 圖片是以陣列的形式存在$refs.fileInput.files下，因此先宣告一個變數來儲存我們找到的圖片，可根據需求決定是抓哪一張圖片或是整個陣列
      const uploadedFile = this.$refs.fileInput.files[0];
      // 把圖片轉換成FromData，先宣告一個變數是new FormData()，接著利用append的方式將圖片塞入
      const formData = new FormData();
      // 將uploadedFile加入到FormData中，並使用'file-to-upload'作為該檔案的 key（通常是後端接受檔案的參數名稱）
      formData.append('file-to-upload', uploadedFile);
      // 因為是以 FormData的格式傳送，跟之前以物件的形式不同，所以需要更改傳遞格式
      // 資料的傳遞需要雙方對資料格式有一定的認知，透過 HTTP 的 Content-Type 標頭可以知道這個請求的內容是什麼，進而用對應的方式解讀資料
      this.$http.post(`${VITE_URL}/v2/api/${VITE_NAME}/admin/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          this.editProduct.imageUrl = res.data.imageUrl;
        })
        .catch(() => {
          this.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
  },
  watch: { /* 監聽tempProduct，當tempProduct發生改變時重新賦予editProduct */
    tempProduct() {
      this.editProduct = this.tempProduct;
      this.$refs.fileInput.value = '';
    },
  },
  emits: ['update-product'],
  mixins: [modalMixin],
};
</script>
