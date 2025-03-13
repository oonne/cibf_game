import { Controller, Post, Body } from '@nestjs/common';
import { NoLogin } from '../../common/decorator/auth.decorator';
import { Roles } from '../../common/decorator/roles.decorator';
import ErrorCode from '../../constant/error-code';
import { resSuccess } from '../../utils/index';
import type { HttpResponse, ListResponse } from '../../types/type';
import { SettingService } from '../setting/setting.service';
import { UserService } from './user.service';
import {
  GetListDto,
  GetDetailDto,
  DeleteUserDto,
  UserEntryDto,
  UserOperationReportDto,
} from './dto/user.dto';
import type { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
    private readonly SettingService: SettingService,
  ) {}

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
      lotteryTimes: getListDto.lotteryTimes,
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
   * 用户进入页面
   */
  @Post('user-entry')
  @NoLogin
  async userEntry(@Body() userEntryDto: UserEntryDto): Promise<HttpResponse<any>> {
    // 检查uuid是否存在, 如果用户不存在，则创建用户
    let user = await this.UserService.getDetailByUuid(userEntryDto.uuid);
    if (!user) {
      // 校验openId唯一
      if (userEntryDto.openId) {
        const sameOpenIdUser = await this.UserService.getDetailByOpenId(userEntryDto.openId);
        if (sameOpenIdUser) {
          return {
            code: ErrorCode.USER_OPENID_UNIQUE,
            message: 'openId与uuid不匹配',
          };
        }
      }

      await this.UserService.create({
        uuid: userEntryDto.uuid,
        openId: userEntryDto.openId,
        lastVisitTime: new Date(),
      });
      user = await this.UserService.getDetailByUuid(userEntryDto.uuid);
    } else {
      // 更新最后访问时间
      await this.UserService.update({
        userId: user.userId,
        lastVisitTime: new Date(),
      });
    }

    // 返回字段处理
    delete user.id;

    // 查询配置，判断活动是否结束
    const setting = await this.SettingService.getDetailByKey('CIBF_SETTING');
    if (setting?.value) {
      try {
        const settingValue = JSON.parse(setting.value);
        if (!settingValue.isActive) {
          return {
            code: ErrorCode.ACTIVITY_ENDED,
            message: '活动已结束',
          };
        }
      } catch (e) {
        console.error(e);
      }
    }

    return resSuccess(user);
  }

  /*
   * 用户玩游戏上报
   */
  @Post('game-report')
  @NoLogin
  async gameReport(
    @Body() userOperationReportDto: UserOperationReportDto,
  ): Promise<HttpResponse<any>> {
    const user = await this.UserService.getDetailByUuid(userOperationReportDto.uuid);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // await this.UserService.update({
    //   userId: user.userId,
    //   hasPlayedGame: true,
    //   lastPlayedTime: new Date(),
    // });

    return resSuccess(null);
  }
}
