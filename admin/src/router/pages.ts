import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const pages: RouteRecordRaw[] = [
  /*
   * 系统页面
   */
  // 异常
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/pages/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },

  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login-form.vue'),
    meta: {
      noNeedLogin: true,
    },
  },

  /*
   * 首页
   */
  {
    path: '/home',
    component: Layout,
    children: [
      // 首页
      {
        path: 'index',
        component: () => import('@/pages/home/index.vue'),
        name: 'home',
        meta: {
          sideKey: 'home',
          title: '首页',
        },
      },
    ],
  },

  /*
   * 系统
   */
  {
    path: '/system',
    component: Layout,
    children: [
      // 成员管理
      {
        path: 'staff',
        component: () => import('@/pages/system/staff/index.vue'),
        name: 'staff',
        meta: {
          sideKey: 'staff',
          title: '账号管理',
        },
      },
      // 新增/编辑成员
      {
        path: 'edit-staff',
        component: () => import('@/pages/system/staff/edit-staff.vue'),
        name: 'edit-staff',
        meta: {
          sideKey: 'staff',
          title: '新增/编辑成员',
        },
      },
      // 回收站
      {
        path: 'recycle',
        component: () => import('@/pages/system/recycle/index.vue'),
        name: 'recycle',
        meta: {
          sideKey: 'recycle',
          title: '回收站',
        },
      },
      // 回收详情
      {
        path: 'recycle-detail',
        component: () => import('@/pages/system/recycle/recycle-detail.vue'),
        name: 'recycle-detail',
        meta: {
          sideKey: 'recycle',
          title: '回收详情',
        },
      },
      // 系统配置
      {
        path: 'setting',
        component: () => import('@/pages/system/setting/index.vue'),
        name: 'setting',
        meta: {
          sideKey: 'setting',
          title: '系统配置',
        },
      },
      // 新增/编辑系统配置
      {
        path: 'edit-setting',
        component: () => import('@/pages/system/setting/edit-setting.vue'),
        name: 'edit-setting',
        meta: {
          sideKey: 'setting',
          title: '新增/编辑系统配置',
        },
      },
      // 系统配置详情
      {
        path: 'setting-detail',
        component: () => import('@/pages/system/setting/setting-detail.vue'),
        name: 'setting-detail',
        meta: {
          sideKey: 'setting',
          title: '系统配置详情',
        },
      },
    ],
  },

  /*
   * CIBF
   */
  {
    path: '/cibf',
    component: Layout,
    children: [
      // 系统配置
      {
        path: 'setting',
        component: () => import('@/pages/cibf/setting/index.vue'),
        name: 'cibf-setting',
        meta: {
          sideKey: 'cibf-setting',
          title: 'CIBF配置',
        },
      },
      // 访客列表
      {
        path: 'user',
        component: () => import('@/pages/cibf/user/index.vue'),
        name: 'cibf-user',
        meta: {
          sideKey: 'cibf-user',
          title: '访客列表',
        },
      },
      // 访客详情
      {
        path: 'user-detail',
        component: () => import('@/pages/cibf/user/user-detail.vue'),
        name: 'cibf-user-detail',
        meta: {
          sideKey: 'cibf-user',
          title: '访客详情',
        },
      },
      // 兑换码列表
      {
        path: 'redeem',
        component: () => import('@/pages/cibf/redeem/index.vue'),
        name: 'cibf-redeem',
        meta: {
          sideKey: 'cibf-redeem',
          title: '兑换码列表',
        },
      },
      // 兑换码详情
      {
        path: 'redeem-detail',
        component: () => import('@/pages/cibf/redeem/redeem-detail.vue'),
        name: 'cibf-redeem-detail',
        meta: {
          sideKey: 'cibf-redeem',
          title: '兑换码详情',
        },
      },
      // 批量生成兑换码
      {
        path: 'batch-generate',
        component: () => import('@/pages/cibf/redeem/batch-generate.vue'),
        name: 'cibf-batch-generate',
        meta: {
          sideKey: 'cibf-redeem',
          title: '批量生成兑换码',
        },
      },
      // 批量删除兑换码
      {
        path: 'batch-delete',
        component: () => import('@/pages/cibf/redeem/batch-delete.vue'),
        name: 'cibf-batch-delete',
        meta: {
          sideKey: 'cibf-redeem',
          title: '批量删除兑换码',
        },
      },
    ],
  },
];

export default pages;
