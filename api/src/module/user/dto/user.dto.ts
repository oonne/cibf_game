import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

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

export class GetDetailDto {
  @IsString()
  userId: string;
}

export class CreateUserDto {
  @IsString()
  uuid: string;

  @IsString()
  @IsOptional()
  openId?: string;
}

export class UpdateUserDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  openId?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class DeleteUserDto {
  @IsString()
  userId: string;
}
