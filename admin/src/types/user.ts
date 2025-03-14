/* 用户 */
export interface IUser {
  id?: number;
  userId?: string;
  uuid?: string;
  openId?: string;
  phone?: string;
  lastVisitTime?: Date;
  hasPlayedGame?: boolean;
  hasShared?: boolean;
  hasBrowsed?: boolean;
  lotteryTimes?: number;
  winningPrizeName?: string;
  redeemCode?: string;
  hasRedeemed?: boolean;
  gameTime?: Date;
  sharedTime?: Date;
  browsedTime?: Date;
  winningTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}
