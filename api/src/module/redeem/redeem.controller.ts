import { Controller, Post, Body } from '@nestjs/common';
import ErrorCode from '../../constant/error-code';
import { resSuccess } from '../../utils/index';
import type { HttpResponse, ListResponse } from '../../types/type';
import { UserService } from '../user/user.service';
import { RedeemService } from './redeem.service';
import {
  GetListDto,
  GetDetailDto,
  DeleteRedeemDto,
  BatchGenerateRedeemDto,
  BatchDeleteRedeemDto,
  RedeemDto,
} from './dto/redeem.dto';
import type { Redeem } from './redeem.entity';

@Controller('redeem')
export class RedeemController {
  constructor(
    private readonly RedeemService: RedeemService,
    private readonly UserService: UserService,
  ) {}

  /*
   * 查询兑奖码列表
   */
  @Post('get-list')
  async getList(@Body() getListDto: GetListDto): Promise<HttpResponse<ListResponse<Redeem>>> {
    const { items, total } = await this.RedeemService.getList({
      pageNo: getListDto.pageNo,
      pageSize: getListDto.pageSize,
      sortField: getListDto.sortField,
      sortOrder: getListDto.sortOrder,
      redeemCode: getListDto.redeemCode,
      prizeType: getListDto.prizeType,
      isIssued: getListDto.isIssued,
      issuedTime: getListDto.issuedTime,
      issuedUserPhone: getListDto.issuedUserPhone,
      isRedeemed: getListDto.isRedeemed,
      redeemedTime: getListDto.redeemedTime,
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
   * 根据redeemCodeId查询单个
   */
  @Post('get-detail')
  async getDetail(@Body() getDetailDto: GetDetailDto): Promise<HttpResponse<any>> {
    const redeem = await this.RedeemService.getDetail(getDetailDto.redeemCodeId);
    if (!redeem) {
      return {
        code: ErrorCode.REDEEM_NOT_FOUND,
        message: '兑奖码不存在',
      };
    }

    // 返回字段处理
    delete redeem.id;

    return resSuccess(redeem);
  }

  /*
   * 删除兑奖码
   */
  @Post('delete')
  async delete(@Body() deleteRedeemDto: DeleteRedeemDto): Promise<HttpResponse<any>> {
    const redeem = await this.RedeemService.getDetail(deleteRedeemDto.redeemCodeId);
    if (!redeem) {
      return {
        code: ErrorCode.REDEEM_NOT_FOUND,
        message: '兑奖码不存在',
      };
    }

    await this.RedeemService.delete(deleteRedeemDto.redeemCodeId);
    return resSuccess(null);
  }

  /*
   * 批量生成兑奖码
   */
  @Post('batch-generate')
  async batchGenerate(
    @Body() batchGenerateRedeemDto: BatchGenerateRedeemDto,
  ): Promise<HttpResponse<any>> {
    await this.RedeemService.createBatch(batchGenerateRedeemDto);
    return resSuccess(null);
  }

  /*
   * 批量删除兑奖码
   */
  @Post('batch-delete')
  async batchDelete(
    @Body() batchDeleteRedeemDto: BatchDeleteRedeemDto,
  ): Promise<HttpResponse<any>> {
    await this.RedeemService.deleteBatch(batchDeleteRedeemDto);
    return resSuccess(null);
  }

  /*
   * 兑奖
   */
  @Post('redeem')
  async redeem(@Body() redeemDto: RedeemDto): Promise<HttpResponse<any>> {
    const redeem = await this.RedeemService.getDetailByRedeemCode(redeemDto.redeemCode);
    if (!redeem) {
      return {
        code: ErrorCode.REDEEM_NOT_FOUND,
        message: '兑奖码不存在',
      };
    }
    if (redeem.isRedeemed) {
      return {
        code: ErrorCode.REDEEM_ALREADY_REDEEMED,
        message: '兑奖码已兑奖',
      };
    }
    if (!redeem.isIssued || !redeem.issuedUserId) {
      return {
        code: ErrorCode.REDEEM_NOT_ISSUED,
        message: '兑奖码未发放',
      };
    }

    // 查询用户
    const user = await this.UserService.getDetail(redeem.issuedUserId);
    if (!user) {
      return {
        code: ErrorCode.USER_NOT_FOUND,
        message: '用户不存在',
      };
    }

    // 更新兑奖码
    await this.RedeemService.update({
      redeemCodeId: redeem.redeemCodeId,
      isRedeemed: true,
      redeemedTime: new Date(),
      issuedUserPhone: user.phone,
    });

    // 更新用户
    await this.UserService.update({
      userId: user.userId,
      hasRedeemed: true,
    });

    return resSuccess(null);
  }
}
