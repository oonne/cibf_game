import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Utils, Condition } from '../../utils/index';
import { Redeem } from './redeem.entity';

const { generateId } = Utils;
const { getStringCondition, getDateRangeCondition } = Condition;

@Injectable()
export class RedeemService {
  constructor(
    @InjectRepository(Redeem)
    private redeemRepository: Repository<Redeem>,
  ) {}

  /*
   * 查询列表
   */
  async getList({
    pageNo = 1,
    pageSize = 10,
    sortField = 'createdAt',
    sortOrder = 'desc',
    redeemCode,
    prizeType,
    isIssued,
    issuedTime,
    issuedUserPhone,
    isRedeemed,
    redeemedTime,
  }: {
    pageNo?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    redeemCode?: string;
    prizeType?: number[];
    isIssued?: boolean;
    issuedTime?: string;
    issuedUserPhone?: string;
    isRedeemed?: boolean;
    redeemedTime?: string;
  }): Promise<{ items: Redeem[]; total: number }> {
    const [items, total] = await this.redeemRepository.findAndCount({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      order: {
        [sortField]: sortOrder,
      },
      where: {
        redeemCode: getStringCondition(redeemCode),
        prizeType: prizeType?.length ? In(prizeType) : undefined,
        isIssued,
        issuedTime: getDateRangeCondition(issuedTime),
        issuedUserPhone: getStringCondition(issuedUserPhone),
        isRedeemed,
        redeemedTime: getDateRangeCondition(redeemedTime),
      },
    });

    return {
      items,
      total,
    };
  }

  /*
   * 根据redeemCodeId查询单个
   */
  getDetail(redeemCodeId: string): Promise<Redeem> {
    return this.redeemRepository.findOneBy({ redeemCodeId });
  }

  /*
   * 删除
   */
  async delete(redeemCodeId: string): Promise<void> {
    await this.redeemRepository.delete({ redeemCodeId });
  }

  /*
   * 批量新增兑奖码
   */
  async createBatch(): Promise<void> {
    console.log(generateId('TODO'));
  }
}
