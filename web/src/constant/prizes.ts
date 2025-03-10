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
    name: '耳机',
    isWin: true,
  },
  {
    id: 2,
    name: 'iPhone',
    isWin: true,
  },
  {
    id: 3,
    name: '相机',
    isWin: true,
  },
  {
    id: 4,
    name: '感谢参与',
    isWin: false,
  },
  {
    id: 5,
    name: '日历',
    isWin: true,
  },
  {
    id: 6,
    name: '键盘',
    isWin: true,
  },
];

export default prizes;
