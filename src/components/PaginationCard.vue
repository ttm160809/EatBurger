<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 沒有前一頁則啟用disabled -->
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a class="page-link" href="#" aria-label="Previous"
           @click.prevent="changePage(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 當前頁面顯示active -->
      <li v-for="page in pages.total_pages" :key="page" class="page-item"
        :class="{ active: page === pages.current_page }">
        <a class="page-link" href="#" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>
      <!-- 沒有後一頁則啟用disabled -->
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="changePage(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    changePage(page) {
      if (this.$route.path === '/admin/products') {
        this.getProducts(page);
      } else if (this.$route.path === '/admin/orders') {
        this.getOrders(page);
      } else if (this.$route.path === '/admin/coupons') {
        this.getCoupons(page);
      }
    },
  },
  props: ['pages', 'getProducts', 'getOrders', 'getCoupons'],
};
</script>
