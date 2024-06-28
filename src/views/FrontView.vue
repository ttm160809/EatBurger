<template>
    <HeaderComponent></HeaderComponent>
    <main class="front-main">
      <RouterView></RouterView>
    </main>
    <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<!-- scoped 屬性的作用是避免父元件的 CSS 樣式會污染到子元件的 CSS 樣式。 -->
<style scoped></style>
