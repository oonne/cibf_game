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
  winningTimes?: string;

  @IsString()
  @IsOptional()
  winningPrizeName?: string;

  @IsString()
  @IsOptional()
  redeemCode?: string;
}

/* 获取用户详情 */
export class GetDetailDto {
  @IsString()
  userId: string;
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
