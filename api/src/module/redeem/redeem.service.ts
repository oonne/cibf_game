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
   * 根据redeemCode查询单个
   */
  getDetailByRedeemCode(redeemCode: string): Promise<Redeem> {
    return this.redeemRepository.findOneBy({ redeemCode });
  }

  /*
   * 根据prizeType查询未发放的兑奖码
   */
  getUnissuedByPrizeType(prizeType: number): Promise<Redeem> {
    return this.redeemRepository.findOneBy({ prizeType, isIssued: false });
  }

  /*
   * 更新
   */
  async update(redeem: Partial<Redeem>): Promise<Redeem> {
    let redeemToUpdate = await this.redeemRepository.findOneBy({
      redeemCodeId: redeem.redeemCodeId,
    });
    if (!redeemToUpdate) {
      throw new Error('Redeem not found');
    }

    redeemToUpdate = {
      ...redeemToUpdate,
      ...redeem,
    };

    return this.redeemRepository.save(redeemToUpdate);
  }

  /*
   * 删除
   */
  async delete(redeemCodeId: string): Promise<void> {
    await this.redeemRepository.delete({ redeemCodeId });
  }

  /*
   * 批量生成兑奖码
   */
  async createBatch({ prizeType, count }: { prizeType: number; count: number }): Promise<void> {
    const redeemCodes = [];
    for (let i = 0; i < count; i++) {
      redeemCodes.push({
        redeemCodeId: generateId('redeem'),
        redeemCode: generateId('CIBF'),
        prizeType,
        isIssued: false,
        isRedeemed: false,
      });
    }

    await this.redeemRepository.insert(redeemCodes);
  }

  /*
   * 批量删除兑奖码
   */
  async deleteBatch({ prizeType }: { prizeType: number }): Promise<void> {
    await this.redeemRepository.delete({ prizeType });
  }
}
