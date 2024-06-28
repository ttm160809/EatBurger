import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
import VueAxios from 'vue-axios';

// 引入bootstrap icon
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';

// 引入veeValidate (驗證套件 + 在地化語系)
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate'; // 引入 VeeValidate 元件跟功能
import * as AllRules from '@vee-validate/rules'; // 引入 VeeValidate 的驗證規則
import { localize, setLocale } from '@vee-validate/i18n'; // 引入 VeeValidate 的 i18n 功能
import JA from '@vee-validate/i18n/dist/locale/ja.json'; // 引入 VeeValidate 的繁體日文語系檔

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import router from './router';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
}); // 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate

configure({
  generateMessage: localize({ Japanese: JA }), // 將當前 VeeValidate 的語系設定為日文
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

setLocale('Japanese');

AOS.init({
  once: true,
});

const app = createApp(App);

app.use(createPinia());
app.use(VueAxios, axios);
app.use(router);
app.use(Swal);
app.use(AOS);

// 掛載 Global 的 VeeValidate 元件
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('VLoading', Loading);

app.mount('#app');
