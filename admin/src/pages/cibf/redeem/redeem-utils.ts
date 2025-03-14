import prizeTypeList from '@/constant/prize';
import type { PrizeType } from '@/types/redeem';

/* 获取奖品类型文本 */
export const getPrizeTypeText = (type?: PrizeType) => {
  const prizeType = prizeTypeList.find((item) => item.type === type);
  return prizeType?.name || '';
};

/* 获取奖品类型筛选项 */
export const getPrizeTypeFilters = () => prizeTypeList.map((item) => ({
  text: item.name,
  value: item.type,
}));
