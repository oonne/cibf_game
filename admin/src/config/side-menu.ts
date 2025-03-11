/*
 * 侧边栏配置
 */
export interface ISideConfig {
  key: string;
  title: string; // 标题
  icon?: string; // 图标
  roles?: number[];
  children?: ISideConfig[];
}

const sideMenu: ISideConfig[] = [
  // 首页
  {
    key: 'home',
    title: '首页',
    icon: 'home',
  },

  // 系统
  {
    key: 'system',
    title: '系统',
    icon: 'settings',
    children: [
      {
        key: 'staff',
        title: '账号管理',
        roles: [1],
      },
      {
        key: 'recycle',
        title: '回收站',
        roles: [1],
      },
      {
        key: 'setting',
        title: '系统配置',
        roles: [1],
      },
    ],
  },
];

export default sideMenu;
