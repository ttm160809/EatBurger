<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="container">
    <section class="position-relative">
      <img src="../../assets/img/menuBanner.jpg" class="card-img-top menu-banner" alt="...">
      <h2 class="fs-5r fw-bold position-absolute bg-primary bg-opacity-50
                 text-white text-center top-50 start-50 translate-middle w-75 p-3">
        メニュー
      </h2>
    </section>
    <div class="category-select position-relative col-6 col-md-2 mb-4 mt-5">
      <select name="" id="" @change="changeCategory($event)" ref="categorySelect"
              class="bg-primary text-white w-100 rounded-pill fs-5 py-2 px-3 border-0">
        <option :value="category" v-for="category in categories"
                :key="category">{{ category }}</option>
      </select>
    </div>
    <div class="row product-cards-list justify-content-center">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="product-cards card border-0 mb-4" @click="openModal(product)">
          <div class="product-img rounded-top overflow-hidden">
            <!-- CSS 圖片自適應容器（object-fit / background-image）
            background 的用途是替網站增加裝飾或美觀，而不是讓圖片被搜尋引擎收錄。
            某些情境需要使用 <img> 圖片標籤，像圖片需能被搜尋引擎爬蟲讀取（需要有 alt 屬性），
            這時就可透過 object-fit 來達成 -->
            <img :src="product.imageUrl" class="card-img-top rounded-0 "
                  style="object-fit: cover;" height="300" alt="...">
          </div>
          <div class="card-body">
            <h3 class="mb-4 text-primary fw-bolder fs-4">{{ product.title }}</h3>
            <div class="d-flex flex-nowrap justify-content-between">
              <p class="card-text mb-0">
                <span class="fw-bold fs-4 me-1 text-change">¥ {{ product.price }}</span>
                <span class="text-muted"><del>¥ {{ product.origin_price }}</del></span>
              </p>
              <button type="button" class="btn btn-primary text-white d-flex justify-content-end"
                      @click.stop="addToCart(product.id, 1)">
                <i class="bi bi-cart-fill me-1"></i>
                <span class="fs-6">カートに入れる</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ShopModal :temp-product="tempProduct"
              ref="sModal">
  </ShopModal>
</template>

<script>
import { mapActions } from 'pinia';

import ShopModal from '@/components/ShopModal.vue';
import cartStore from '@/stores/cartStore';
import sweetAlertStore from '@/stores/sweetAlertStore';

const { VITE_URL, VITE_NAME } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      tempProduct: {},
      categories: ['全て', 'バーガー', 'サイド', 'ドリンク'],
      homeQuery: this.$route.query.category,
    };
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(sweetAlertStore, ['swalError']),
    getProducts() { /* 獲取商品資料 */
      this.isLoading = true;
      if (this.homeQuery === undefined) {
        this.$http.get(`${VITE_URL}/v2/api/${VITE_NAME}/products/all`)
          .then((res) => {
            this.products = res.data.products;
            this.isLoading = false;
          })
          .catch(() => {
            this.swalError();
          });
      } else {
        this.$refs.categorySelect.value = this.homeQuery;
        this.$http.get(`${VITE_URL}/v2/api/${VITE_NAME}/products?category=${this.$refs.categorySelect.value}`)
          .then((res) => {
            this.products = res.data.products;
            this.homeQuery = undefined;
            this.isLoading = false;
          })
          .catch(() => {
            this.swalError();
          });
      }
    },
    changeCategory(event, page = 1) {
      this.isLoading = true;
      const selectCategory = event.target.value;
      if (selectCategory === '全て') {
        this.getProducts();
      } else {
        this.$http.get(`${VITE_URL}/v2/api/${VITE_NAME}/products?category=${selectCategory}&page=${page}`)
          .then((res) => {
            this.products = res.data.products;
            this.pages = res.data.pagination;
            this.isLoading = false;
          })
          .catch(() => {
            this.swalError();
          });
      }
    },
    openModal(product) {
      this.tempProduct = { ...product };
      this.$refs.sModal.openModal();
    },
  },
  mounted() {
    this.getProducts();
  },
  components: {
    ShopModal,
  },
};
</script>

<style scoped></style>
