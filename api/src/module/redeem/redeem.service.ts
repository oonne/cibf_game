import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    redeemCodeId,
    openId,
    prizeName,
    isIssued,
    issuedTime,
    issuedUserId,
    issuedUserPhone,
    isRedeemed,
    redeemedTime,
    createdAt,
  }: {
    pageNo?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    redeemCodeId?: string;
    openId?: string;
    prizeName?: string;
    isIssued?: boolean;
    issuedTime?: string;
    issuedUserId?: string;
    issuedUserPhone?: string;
    isRedeemed?: boolean;
    redeemedTime?: string;
    createdAt?: string;
  }): Promise<{ items: Redeem[]; total: number }> {
    const [items, total] = await this.redeemRepository.findAndCount({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      order: {
        [sortField]: sortOrder,
      },
      where: {
        redeemCodeId: getStringCondition(redeemCodeId),
        openId: getStringCondition(openId),
        prizeName: getStringCondition(prizeName),
        isIssued,
        issuedTime: getDateRangeCondition(issuedTime),
        issuedUserId: getStringCondition(issuedUserId),
        issuedUserPhone: getStringCondition(issuedUserPhone),
        isRedeemed,
        redeemedTime: getDateRangeCondition(redeemedTime),
        createdAt: getDateRangeCondition(createdAt),
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
   * 根据openId查询单个
   */
  getDetailByOpenId(openId: string): Promise<Redeem> {
    return this.redeemRepository.findOneBy({ openId });
  }

  /*
   * 新增
   */
  async create(redeem: Partial<Redeem>): Promise<Redeem> {
    // 生成随机的redeemCodeId
    const redeemCodeId = generateId('redeem');
    // 如果redeemCodeId已存在，则重新生成
    if (await this.redeemRepository.findOneBy({ redeemCodeId })) {
      return this.create(redeem);
    }

    const redeemToCreate = {
      ...redeem,
      redeemCodeId,
    };

    return this.redeemRepository.save(redeemToCreate);
  }

  /*
   * 更新
   */
  async update(redeem: Partial<Redeem>): Promise<Redeem> {
    let redeemToUpdate = await this.redeemRepository.findOneBy({
      redeemCodeId: redeem.redeemCodeId,
    });
    if (!redeemToUpdate) {
      throw new Error('Redeem code not found');
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
   * 发放兑奖码
   */
  async issue(
    redeemCodeId: string,
    issuedUserId: string,
    issuedUserPhone?: string,
  ): Promise<Redeem> {
    const redeem = await this.getDetail(redeemCodeId);
    if (!redeem) {
      throw new Error('Redeem code not found');
    }

    if (redeem.isIssued) {
      throw new Error('Redeem code already issued');
    }

    return this.update({
      redeemCodeId,
      isIssued: true,
      issuedTime: new Date(),
      issuedUserId,
      issuedUserPhone,
    });
  }

  /*
   * 兑换兑奖码
   */
  async redeem(redeemCodeId: string, openId: string): Promise<Redeem> {
    const redeem = await this.getDetail(redeemCodeId);
    if (!redeem) {
      throw new Error('Redeem code not found');
    }

    if (redeem.isRedeemed) {
      throw new Error('Redeem code already redeemed');
    }

    return this.update({
      redeemCodeId,
      openId,
      isRedeemed: true,
      redeemedTime: new Date(),
    });
  }
}
