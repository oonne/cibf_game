import { IsString, IsOptional, IsBoolean, IsNumber, IsIn } from 'class-validator';
import { prizeTypeKeyArr } from '../../../constant/prize';

/* 获取兑奖码列表 */
export class GetListDto {
  @IsNumber()
  @IsOptional()
  pageNo?: number;

  @IsNumber()
  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsString()
  @IsOptional()
  sortOrder?: string;

  @IsString()
  @IsOptional()
  redeemCode?: string;

  @IsNumber()
  @IsOptional()
  @IsIn(prizeTypeKeyArr, { each: true })
  prizeType?: number[];

  @IsBoolean()
  @IsOptional()
  isIssued?: boolean;

  @IsString()
  @IsOptional()
  issuedTime?: string;

  @IsString()
  @IsOptional()
  issuedUserPhone?: string;

  @IsBoolean()
  @IsOptional()
  isRedeemed?: boolean;

  @IsString()
  @IsOptional()
  redeemedTime?: string;
}

/* 获取兑奖码详情 */
export class GetDetailDto {
  @IsString()
  redeemCodeId: string;
}

/* 删除兑奖码 */
export class DeleteRedeemDto {
  @IsString()
  redeemCodeId: string;
}
