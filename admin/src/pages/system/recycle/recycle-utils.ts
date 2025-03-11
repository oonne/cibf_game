import type { RecycleType } from '@/types/recycle';

/* 获取回收类型名称 */
export const getRecycleTypeName = (type: RecycleType) => {
  if (type === 1) {
    return '账号';
  }
  if (type === 2) {
    return '配置';
  }
  if (type === 3) {
    return '博客';
  }
  return '';
};
