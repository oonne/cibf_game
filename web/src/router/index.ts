import { createRouter, createWebHashHistory } from 'vue-router';
import pages from './pages';

// 默认跳转到首页
pages.push({
  path: '/',
  redirect: '/home',
});

// 找不到则跳转到首页
pages.push({
  path: '/:pathMatch(.*)*',
  redirect: '/home',
});

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: pages,
});

export default router;
