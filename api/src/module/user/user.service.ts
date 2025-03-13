import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils, Condition } from '../../utils/index';
import { User } from './user.entity';

const { generateId } = Utils;
const { getStringCondition, getNumberCondition } = Condition;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /*
   * 查询列表
   */
  async getList({
    pageNo = 1,
    pageSize = 10,
    sortField = 'createdAt',
    sortOrder = 'desc',
    openId,
    phone,
    hasPlayedGame,
    hasShared,
    hasBrowsed,
    winningTimes,
    winningPrizeName,
    redeemCode,
  }: {
    pageNo?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    openId?: string;
    phone?: string;
    hasPlayedGame?: boolean;
    hasShared?: boolean;
    hasBrowsed?: boolean;
    winningTimes?: string;
    winningPrizeName?: string;
    redeemCode?: string;
  }): Promise<{ items: User[]; total: number }> {
    const [items, total] = await this.userRepository.findAndCount({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      order: {
        [sortField]: sortOrder,
      },
      where: {
        openId: getStringCondition(openId),
        phone: getStringCondition(phone),
        hasPlayedGame,
        hasShared,
        hasBrowsed,
        winningTimes: getNumberCondition(winningTimes),
        winningPrizeName: getStringCondition(winningPrizeName),
        redeemCode: getStringCondition(redeemCode),
      },
    });

    return {
      items,
      total,
    };
  }

  /*
   * 根据userId查询单个
   */
  getDetail(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ userId });
  }

  /*
   * 新增
   */
  async create(user: Partial<User>): Promise<User> {
    // 生成随机的userId
    const userId = generateId('user');
    // 如果userId已存在，则重新生成
    if (await this.userRepository.findOneBy({ userId })) {
      return this.create(user);
    }

    const userToCreate = {
      ...user,
      userId,
    };

    return this.userRepository.save(userToCreate);
  }

  /*
   * 更新
   */
  async update(user: Partial<User>): Promise<User> {
    let userToUpdate = await this.userRepository.findOneBy({ userId: user.userId });
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    userToUpdate = {
      ...userToUpdate,
      ...user,
    };

    return this.userRepository.save(userToUpdate);
  }

  /*
   * 删除
   */
  async delete(userId: string): Promise<void> {
    await this.userRepository.delete({ userId });
  }
}
