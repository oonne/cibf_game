/* 兑奖码 */
// 奖品类型：1手持电风扇 2车载音响 3玩偶 4加湿器 5雨伞
export type PrizeType = 1 | 2 | 3 | 4 | 5;

export interface IRedeem {
  id?: number;
  redeemCodeId?: string;
  redeemCode?: string;
  prizeType?: PrizeType;
  isIssued?: boolean;
  issuedTime?: Date;
  issuedUserId?: string;
  issuedUserPhone?: string;
  isRedeemed?: boolean;
  redeemedTime?: Date;
  [key: string]: any;
}
