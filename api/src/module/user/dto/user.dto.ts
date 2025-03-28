import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

/* 获取用户列表 */
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
  openId?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  lastVisitTime?: string;

  @IsString()
  @IsOptional()
  gameTimes?: string;

  @IsBoolean()
  @IsOptional()
  hasPlayedGame?: boolean;

  @IsBoolean()
  @IsOptional()
  hasShared?: boolean;

  @IsBoolean()
  @IsOptional()
  hasBrowsed?: boolean;

  @IsString()
  @IsOptional()
  lotteryTimes?: string;

  @IsString()
  @IsOptional()
  winningPrizeName?: string;

  @IsBoolean()
  @IsOptional()
  hasRedeemed?: boolean;
}

/* 获取用户详情 */
export class GetDetailDto {
  @IsString()
  userId: string;
}

/* 更新用户信息 */
export class UpdateUserDto {
  @IsString()
  userId: string;

  @IsNumber()
  @IsOptional()
  gameTimes?: number;

  @IsBoolean()
  @IsOptional()
  hasPlayedGame?: boolean;

  @IsBoolean()
  @IsOptional()
  hasShared?: boolean;

  @IsBoolean()
  @IsOptional()
  hasBrowsed?: boolean;

  @IsNumber()
  @IsOptional()
  lotteryTimes?: number;

  @IsString()
  @IsOptional()
  winningPrizeName?: string;

  @IsString()
  @IsOptional()
  redeemCodeId?: string;

  @IsString()
  @IsOptional()
  redeemCode?: string;

  @IsBoolean()
  @IsOptional()
  hasRedeemed?: boolean;
}

/* 删除用户 */
export class DeleteUserDto {
  @IsString()
  userId: string;
}

/* 用户进入页面 */
export class UserEntryDto {
  @IsString()
  uuid: string;

  @IsString()
  @IsOptional()
  openId?: string;
}

/* 用户操作上报 */
export class UserOperationReportDto {
  @IsString()
  @IsOptional()
  uuid?: string;

  @IsString()
  @IsOptional()
  openId?: string;
}

/* 提交手机号 */
export class SubmitPhoneDto {
  @IsString()
  uuid: string;

  @IsString()
  phone: string;
}
