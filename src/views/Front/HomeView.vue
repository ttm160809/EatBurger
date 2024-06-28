<template>
  <div class="home-banner d-flex align-items-center">
    <div class="container d-flex flex-column align-items-center">
      <h2 class="bg-white bg-opacity-50 text-black fs-3r mb-6 p-3"
        data-aos="zoom-in" data-aos-delay="100" data-aos-duration="800">
        美味しく！<br>楽しく！<br>贅沢ハンバーガー登場！
      </h2>
      <RouterLink to="/products">
        <button class="btn btn-dark rounded-0 text-center"
                data-aos="zoom-in" data-aos-delay="100" data-aos-duration="800">
          注文する
        </button>
      </RouterLink>
    </div>
  </div>
  <section class="container my-4 my-md-7" style="overflow: hidden">
    <h2 class="text-center fs-3r fw-bold mb-4" data-aos="zoom-in" data-aos-duration="800">
      こだわり
    </h2>
    <div class="row" data-aos="fade-right" data-aos-delay="100" data-aos-duration="800">
      <div class="col-md-6 text-center mb-2 mb-md-0">
        <img src="../../assets/img/foodSafety.jpg"
             style="object-fit: cover;" height="350px" class="w-100" alt="">
      </div>
      <div class="col-md-5 my-auto">
        <span class="text-start fs-5">
          食材の選定から商品提供までの品質基準を設けて、お客様に安全で安心いただける商品をお届けしています。
        </span>
      </div>
    </div>
    <div class="row flex-row-reverse mt-4"
         data-aos="fade-left" data-aos-delay="100" data-aos-duration="800">
      <div class="col-md-6 text-center mb-2 mb-md-0">
        <img src="../../assets/img/handMade.jpg"
             style="object-fit: cover;" height="350px" class="w-100" alt="" >
      </div>
      <div class="col-md-5 my-auto">
        <span class="text-start fs-5">
          できたてのおいしさをお客様にお届けするため、注文を受けてから手づくりしています。
        </span>
      </div>
    </div>
  </section>
  <section class="bg-primary my-4 my-md-7">
    <div class="container">
      <div class="d-flex flex-column flex-md-row
                  justify-content-center align-items-center py-5"
           data-aos="zoom-in" data-aos-delay="100" data-aos-duration="800">
        <div class="mb-4 mb-md-0">
          <img src="../../assets/img/couponGift.jpg" height="200px" width="250px" alt="...">
        </div>
        <div class="text-center ms-0 ms-md-8">
          <h3 class="text-black fw-bold mb-1 fs-2">オープン記念</h3>
          <span class="text-white fs-5">
            30% OFFクーポンをプレゼントさせていただきます！
          </span>
          <div class="bg-black rounded-pill mt-4 mb-2 py-3">
            <p class="text-white fs-5">クーポンコード ｜
              <span class="fw-bold text-success fs-3">OPEN30</span>
            </p>
          </div>
          <span><small>＜有効期限＞ 2024年12月31日まで</small></span>
        </div>
      </div>
    </div>
  </section>
  <section class="container my-4 my-md-7">
    <h2 class="text-center fs-1 fw-bold mb-4"
        data-aos="zoom-in" data-aos-delay="100" data-aos-duration="800">
      メニュー
    </h2>
    <div class="row" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
      <div class="col-md-4 my-2">
        <div class="category-cards card overflow-hidden border-0 rounded-0"
             @click="categorySelect('バーガー')">
          <img src="../../assets/img/burger.jpg" style="object-fit: cover;" height="250"
               class="card-img-top rounded-0" alt="..."/>
          <div class="card-body text-start">
            <h4>バーガー</h4>
          </div>
        </div>
      </div>
      <div class="col-md-4 my-2">
        <div class="category-cards card overflow-hidden border-0 rounded-0"
             @click="categorySelect('サイド')">
          <img src="../../assets/img/side.jpg" style="object-fit: cover;" height="250"
               class="card-img-top rounded-0" alt="..."/>
          <div class="card-body text-start">
            <h4>サイド</h4>
          </div>
        </div>
      </div>
      <div class="col-md-4 my-2">
        <div class="category-cards card overflow-hidden border-0 rounded-0"
             @click="categorySelect('ドリンク')">
          <img src="../../assets/img/drink.jpg" style="object-fit: cover;" height="250"
               class="card-img-top rounded-0" alt="..."/>
          <div class="card-body text-start">
            <h4>ドリンク</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    categorySelect(category) {
      this.$router.push({
        path: 'products',
        query: { category },
      });
    },
  },
};
</script>

<style scoped></style>
