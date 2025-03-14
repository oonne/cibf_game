/* 奖品类型 */
interface IPrizeType {
  key: number;
  name: string;
}

const prizeTypeList: IPrizeType[] = [
  {
    key: 1,
    name: '手持电风扇',
  },
  {
    key: 2,
    name: '车载音响',
  },
  {
    key: 3,
    name: '玩偶',
  },
  {
    key: 4,
    name: '加湿器',
  },
  {
    key: 5,
    name: '雨伞',
  },
];

/* 奖品类型key枚举 */
const prizeTypeKeyArr = prizeTypeList.map((item) => item.key);

/* 奖品类型说明文案 */
const prizeTypeDesc = prizeTypeList.map((item) => `${item.key} ${item.name} `).join(',');

export { prizeTypeList, prizeTypeKeyArr, prizeTypeDesc };
