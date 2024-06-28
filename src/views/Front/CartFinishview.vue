<template>
  <div class="container pt-5">
    <div class="d-flex flex-column d-md-none align-items-center mb-5">
      <div class="border border-secondary bg-secondary w-100 text-center py-2">
        <sapn class="fs-4 text-white">1.カート</sapn>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-down-fill fs-1 text-secondary"></i>
      </div>
      <div class="border border-secondary bg-secondary w-100 text-center py-2">
        <sapn class="fs-4 text-white">2.ご購入手続き</sapn>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-down-fill fs-1 text-secondary"></i>
      </div>
      <div class="border border-primary bg-primary w-100 text-center py-2">
        <sapn class="fs-4 text-white">3.ご注文完了</sapn>
      </div>
    </div>
    <div class="d-none d-md-flex justify-content-center mb-5">
      <div class="border border-secondary bg-secondary px-5 py-4">
        <sapn class="fs-4 text-white">1.カート</sapn>
      </div>
      <div class="d-flex align-items-center mx-2">
        <i class="bi bi-caret-right-fill fs-1 text-secondary"></i>
      </div>
      <div class="border border-secondary bg-secondary px-5 py-4">
        <sapn class="fs-4 text-white">2.ご購入手続き</sapn>
      </div>
      <div class="d-flex align-items-center mx-2">
        <i class="bi bi-caret-right-fill fs-1 text-secondary"></i>
      </div>
      <div class="border border-primary bg-primary px-5 py-4">
        <sapn class="fs-4 text-white">3.ご注文完了</sapn>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="bg-white p-3">
          <div class="d-flex flex-column align-items-center mb-4">
            <i class="bi bi-check-circle-fill fs-8r text-primary"></i>
            <span class="fs-3 fw-bold text-primary mb-4">ご注文ありがとうございました！</span>
            <span class="fs-5">ご注文番号：</span>
            <span class="fs-3 text-change">{{ order_id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      order_id: this.$route.params.id,
    };
  },
};
</script>

<style scoped></style>
