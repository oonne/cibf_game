import type { RecycleType } from '@/types/recycle';

interface IRecycleType {
  type: RecycleType;
  name: string;
}

const recycleTypeList: IRecycleType[] = [
  {
    type: 1,
    name: '账号',
  },
  {
    type: 2,
    name: '配置',
  },
];

export default recycleTypeList;
