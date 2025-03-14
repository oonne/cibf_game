/*
 * 奖品设置
 */
export interface Prize {
  id: number;
  name: string;
  isWin: boolean;
}

const prizes: Prize[] = [
  {
    id: 1,
    name: '手持电风扇',
    isWin: true,
  },
  {
    id: 2,
    name: '车载音响',
    isWin: true,
  },
  {
    id: 3,
    name: '玩偶',
    isWin: true,
  },
  {
    id: 4,
    name: '加湿器',
    isWin: true,
  },
  {
    id: 5,
    name: '雨伞',
    isWin: true,
  },
  {
    id: 6,
    name: '感谢参与',
    isWin: false,
  },
];

export default prizes;
