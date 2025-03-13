import { Controller, Post, Body } from '@nestjs/common';
import { Roles } from '../../common/decorator/roles.decorator';
import ErrorCode from '../../constant/error-code';
import { resSuccess } from '../../utils/index';
import type { HttpResponse, ListResponse } from '../../types/type';
import { UserService } from './user.service';
import { GetListDto, GetDetailDto, DeleteUserDto } from './dto/user.dto';
import type { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  /*
   * 查询用户列表
   */
  @Post('get-list')
  async getList(@Body() getListDto: GetListDto): Promise<HttpResponse<ListResponse<User>>> {
    const { items, total } = await this.UserService.getList({
      pageNo: getListDto.pageNo,
      pageSize: getListDto.pageSize,
      sortField: getListDto.sortField,
      sortOrder: getListDto.sortOrder,
      openId: getListDto.openId,
      phone: getListDto.phone,
      hasPlayedGame: getListDto.hasPlayedGame,
      hasShared: getListDto.hasShared,
      hasBrowsed: getListDto.hasBrowsed,
      winningTimes: getListDto.winningTimes,
      winningPrizeName: getListDto.winningPrizeName,
      redeemCode: getListDto.redeemCode,
    });

    // 返回字段处理
    items.forEach((item) => {
      delete item.id;
    });

    return resSuccess({
      pageNo: getListDto.pageNo,
      total: total,
      list: items,
    });
  }

  /*
   * 根据userId查询单个
   */
  @Post('get-detail')
  async getDetail(@Body() getDetailDto: GetDetailDto): Promise<HttpResponse<any>> {
    const user = await this.UserService.getDetail(getDetailDto.userId);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // 返回字段处理
    delete user.id;

    return resSuccess(user);
  }

  /*
   * 删除用户
   */
  @Post('delete')
  @Roles([1, 2])
  async delete(@Body() deleteUserDto: DeleteUserDto): Promise<HttpResponse<any>> {
    const user = await this.UserService.getDetail(deleteUserDto.userId);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    await this.UserService.delete(deleteUserDto.userId);
    return resSuccess(null);
  }

  /*
   * 新用户进入
   */
  // @Post('add')
  // @Roles([1])
  // async add(@Body() createUserDto: CreateUserDto): Promise<HttpResponse<any>> {
  //   // 校验openId唯一
  //   if (createUserDto.openId) {
  //     const sameOpenIdUser = await this.UserService.getDetailByOpenId(createUserDto.openId);
  //     if (sameOpenIdUser) {
  //       return {
  //         code: ErrorCode.USER_OPENID_UNIQUE,
  //         message: 'openId已存在',
  //       };
  //     }
  //   }

  //   // 写入数据库
  //   const res = this.UserService.create(createUserDto);
  //   return resSuccess(res);
  // }

  /*
   * 更新用户
   */
  // @Post('update')
  // @Roles([1])
  // async update(@Body() updateUserDto: UpdateUserDto): Promise<HttpResponse<any>> {
  //   const user = await this.UserService.getDetail(updateUserDto.userId);
  //   if (!user) {
  //     return {
  //       code: ErrorCode.USER_NOT_FOUND,
  //       message: '用户不存在',
  //     };
  //   }

  //   // 校验openId唯一
  //   if (updateUserDto.openId && updateUserDto.openId !== user.openId) {
  //     const sameOpenIdUser = await this.UserService.getDetailByOpenId(updateUserDto.openId);
  //     if (sameOpenIdUser) {
  //       return {
  //         code: ErrorCode.USER_OPENID_UNIQUE,
  //         message: 'openId已存在',
  //       };
  //     }
  //   }

  //   const res = await this.UserService.update(updateUserDto);
  //   return resSuccess(res);
  // }
}
