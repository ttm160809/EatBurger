import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Front/HomeView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Front/ProductsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/Front/CartView.vue'),
      },
      {
        path: 'cartInfo',
        component: () => import('../views/Front/CartInfoView.vue'),
      },
      {
        path: 'cartFinish/:id',
        component: () => import('../views/Front/CartFinishview.vue'),
      },
      {
        path: 'SearchOrder',
        component: () => import('../views/Front/SearchOrderView.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/Front/LoginView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Admin/ProductsView.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/OrdersView.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Admin/CouponsView.vue'),
      },
    ],
  },
];

// 路由設定
const router = createRouter({
  // 網址路徑模式：使用網址hash的形式
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  // 切換路由時回到畫面頂部
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
