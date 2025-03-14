import type { PrizeType } from '@/types/redeem';

interface IPrizeType {
  type: PrizeType;
  name: string;
}

const prizeTypeList: IPrizeType[] = [
  {
    type: 1,
    name: '手持电风扇',
  },
  {
    type: 2,
    name: '车载音响',
  },
  {
    type: 3,
    name: '玩偶',
  },
  {
    type: 4,
    name: '加湿器',
  },
  {
    type: 5,
    name: '雨伞',
  },
];

export default prizeTypeList;
