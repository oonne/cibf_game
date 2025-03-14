import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

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
  redeemCodeId?: string;

  @IsString()
  @IsOptional()
  openId?: string;

  @IsString()
  @IsOptional()
  prizeName?: string;

  @IsBoolean()
  @IsOptional()
  isIssued?: boolean;

  @IsString()
  @IsOptional()
  issuedTime?: string;

  @IsString()
  @IsOptional()
  issuedUserId?: string;

  @IsString()
  @IsOptional()
  issuedUserPhone?: string;

  @IsBoolean()
  @IsOptional()
  isRedeemed?: boolean;

  @IsString()
  @IsOptional()
  redeemedTime?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;
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
