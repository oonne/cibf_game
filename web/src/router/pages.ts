import type { RouteRecordRaw } from 'vue-router';

const pages: RouteRecordRaw[] = [
  // 首页
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
  },

  // 拼图
  {
    path: '/jigsaw',
    name: 'jigsaw',
    component: () => import('@/pages/jigsaw/index.vue'),
  },

  // 兑奖
  {
    path: '/redeem',
    name: 'redeem',
    component: () => import('@/pages/redeem/index.vue'),
  },
];

export default pages;
