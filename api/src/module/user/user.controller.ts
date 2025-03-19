import { Controller, Post, Body } from '@nestjs/common';
import { NoLogin } from '../../common/decorator/auth.decorator';
import { Roles } from '../../common/decorator/roles.decorator';
import ErrorCode from '../../constant/error-code';
import { prizeTypeList } from '../../constant/prize';
import { resSuccess, Utils } from '../../utils/index';
import type { HttpResponse, ListResponse } from '../../types/type';
import { SettingService } from '../setting/setting.service';
import { RedeemService } from '../redeem/redeem.service';
import { UserService } from './user.service';
import {
  GetListDto,
  GetDetailDto,
  UpdateUserDto,
  DeleteUserDto,
  UserEntryDto,
  UserOperationReportDto,
  SubmitPhoneDto,
} from './dto/user.dto';
import type { User } from './user.entity';

const { randomWithin } = Utils;

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
    private readonly SettingService: SettingService,
    private readonly RedeemService: RedeemService,
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
      createdAt: getListDto.createdAt,
      lastVisitTime: getListDto.lastVisitTime,
      hasPlayedGame: getListDto.hasPlayedGame,
      hasShared: getListDto.hasShared,
      hasBrowsed: getListDto.hasBrowsed,
      winningPrizeName: getListDto.winningPrizeName,
      lotteryTimes: getListDto.lotteryTimes,
      hasRedeemed: getListDto.hasRedeemed,
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
   * 更新用户信息
   */
  @Post('update')
  @Roles([1, 2])
  async update(@Body() updateUserDto: UpdateUserDto): Promise<HttpResponse<any>> {
    const user = await this.UserService.getDetail(updateUserDto.userId);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    await this.UserService.update({
      userId: user.userId,
      ...updateUserDto,
    });

    return resSuccess(null);
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
    if (setting) {
      try {
        const settingValue = JSON.parse(setting);
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
    const user = userOperationReportDto.openId
      ? await this.UserService.getDetailByOpenId(userOperationReportDto.openId)
      : await this.UserService.getDetailByUuid(userOperationReportDto.uuid);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // 如果用户已经玩过游戏，则不更新
    if (user.hasPlayedGame) {
      return resSuccess(null);
    }

    await this.UserService.update({
      userId: user.userId,
      hasPlayedGame: true,
      gameTime: new Date(),
      lastVisitTime: new Date(),
    });

    return resSuccess(null);
  }

  /*
   * 用户分享上报
   */
  @Post('share-report')
  @NoLogin
  async shareReport(
    @Body() userOperationReportDto: UserOperationReportDto,
  ): Promise<HttpResponse<any>> {
    const user = userOperationReportDto.openId
      ? await this.UserService.getDetailByOpenId(userOperationReportDto.openId)
      : await this.UserService.getDetailByUuid(userOperationReportDto.uuid);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // 如果用户已经分享，则不更新
    if (user.hasShared) {
      return resSuccess(null);
    }

    await this.UserService.update({
      userId: user.userId,
      hasShared: true,
      sharedTime: new Date(),
      lastVisitTime: new Date(),
    });

    return resSuccess(null);
  }

  /*
   * 用户浏览上报
   */
  @Post('browse-report')
  @NoLogin
  async browseReport(
    @Body() userOperationReportDto: UserOperationReportDto,
  ): Promise<HttpResponse<any>> {
    const user = userOperationReportDto.openId
      ? await this.UserService.getDetailByOpenId(userOperationReportDto.openId)
      : await this.UserService.getDetailByUuid(userOperationReportDto.uuid);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // 如果用户已经浏览，则不更新
    if (user.hasBrowsed) {
      return resSuccess(null);
    }

    await this.UserService.update({
      userId: user.userId,
      hasBrowsed: true,
      browsedTime: new Date(),
      lastVisitTime: new Date(),
    });

    return resSuccess(null);
  }

  /*
   * 用户抽奖
   */
  @Post('lottery')
  @NoLogin
  async lottery(@Body() userLotteryDto: UserOperationReportDto): Promise<HttpResponse<any>> {
    const user = await this.UserService.getDetailByUuid(userLotteryDto.uuid);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // 如果抽奖次数不足，则不中奖
    let lotteryTimes = 0;
    if (user.hasPlayedGame) {
      lotteryTimes += 1;
    }
    if (user.hasShared) {
      lotteryTimes += 1;
    }
    if (user.hasBrowsed) {
      lotteryTimes += 1;
    }
    lotteryTimes -= user.lotteryTimes;
    if (lotteryTimes <= 0) {
      return resSuccess({
        isWinning: false,
        winningPrizeName: '',
        message: '抽奖次数不足',
      });
    }

    // 更新用户抽奖次数
    await this.UserService.update({
      userId: user.userId,
      lotteryTimes: user.lotteryTimes + 1,
    });

    // 如果已经中过一次奖，默认不中奖
    if (user.winningPrizeName) {
      return resSuccess({
        isWinning: false,
        winningPrizeName: '',
        message: '已中过奖',
      });
    }

    // 查询配置
    const setting = await this.SettingService.getDetailByKey('CIBF_SETTING');
    if (!setting) {
      return resSuccess({
        isWinning: false,
        winningPrizeName: '',
        message: '查询配置失效',
      });
    }
    let settingValue: any;

    try {
      settingValue = JSON.parse(setting);
    } catch (e) {
      console.error(e);
      return resSuccess({
        isWinning: false,
        winningPrizeName: '',
        message: '查询配置错误',
      });
    }

    // 判断活动是否结束
    if (!settingValue.isActive) {
      return resSuccess({
        isWinning: false,
        winningPrizeName: '',
        message: '活动已结束',
      });
    }

    // settingValue 中有 prize_rate_1 ~ prize_rate_5，对应数字表示中奖率（百分比）。
    // 根据中奖概率依次判断，如果中奖，查找是否存在未发放的兑奖码。
    // 如果存在，则中奖，不进行后续判断，返回奖品和兑奖码
    // 如果每个奖品都没有中奖，返回不中奖
    let redeem: any;
    for (let i = 1; i <= 5; i++) {
      const prizeRate = settingValue[`prize_rate_${i}`];
      const random = randomWithin(100);
      if (random < prizeRate) {
        redeem = await this.RedeemService.getUnissuedByPrizeType(i);
        if (!redeem) {
          return resSuccess({
            isWinning: false,
            winningPrizeName: '',
            message: `奖品 ${i} 不足`,
          });
        }
        break;
      }
    }

    if (!redeem) {
      return resSuccess({
        isWinning: false,
        winningPrizeName: '',
        message: '所有奖品都未抽中',
      });
    }

    // 更新兑奖码
    await this.RedeemService.update({
      redeemCodeId: redeem.redeemCodeId,
      isIssued: true,
      issuedTime: new Date(),
      issuedUserId: user.userId,
    });

    // 获取奖品名
    const prizeName = prizeTypeList.find((item) => item.key === redeem.prizeType)?.name;

    // 更新用户中奖信息
    await this.UserService.update({
      userId: user.userId,
      winningPrizeName: prizeName,
      redeemCodeId: redeem.redeemCodeId,
      redeemCode: redeem.redeemCode,
      winningTime: new Date(),
    });

    // 返回中奖信息
    return resSuccess({
      isWinning: true,
      winningPrizeName: prizeName,
      winningPrizeType: redeem.prizeType,
      redeemCode: redeem.redeemCode,
      message: '中奖了',
    });
  }

  /*
   * 提交手机号
   */
  @Post('submit-phone')
  @NoLogin
  async submitPhone(@Body() submitPhoneDto: SubmitPhoneDto): Promise<HttpResponse<any>> {
    // 查询用户
    const user = await this.UserService.getDetailByUuid(submitPhoneDto.uuid);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // 更新用户手机号
    await this.UserService.update({
      userId: user.userId,
      phone: submitPhoneDto.phone,
    });

    // 更新兑奖码手机号
    await this.RedeemService.update({
      redeemCodeId: user.redeemCodeId,
      issuedUserPhone: submitPhoneDto.phone,
    });

    return resSuccess(null);
  }
}
