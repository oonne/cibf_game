import { Controller, Post, Body } from '@nestjs/common';
import ErrorCode from '../../constant/error-code';
import { resSuccess } from '../../utils/index';
import type { HttpResponse, ListResponse } from '../../types/type';
import { RedeemService } from './redeem.service';
import { GetListDto, GetDetailDto, DeleteRedeemDto } from './dto/redeem.dto';
import type { Redeem } from './redeem.entity';

@Controller('redeem')
export class RedeemController {
  constructor(private readonly RedeemService: RedeemService) {}

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
      prizeName: getListDto.prizeName,
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
}
