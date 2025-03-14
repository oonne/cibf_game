import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils, Condition } from '../../utils/index';
import { User } from './user.entity';

const { generateId } = Utils;
const { getStringCondition, getNumberCondition, getDateRangeCondition } = Condition;

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
    createdAt,
    lastVisitTime,
    hasPlayedGame,
    hasShared,
    hasBrowsed,
    winningPrizeName,
    lotteryTimes,
    hasRedeemed,
  }: {
    pageNo?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    openId?: string;
    phone?: string;
    createdAt?: string;
    lastVisitTime?: string;
    hasPlayedGame?: boolean;
    hasShared?: boolean;
    hasBrowsed?: boolean;
    winningPrizeName?: string;
    lotteryTimes?: string;
    hasRedeemed?: boolean;
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
        createdAt: getDateRangeCondition(createdAt),
        lastVisitTime: getDateRangeCondition(lastVisitTime),
        hasPlayedGame,
        hasShared,
        hasBrowsed,
        lotteryTimes: getNumberCondition(lotteryTimes),
        winningPrizeName: getStringCondition(winningPrizeName),
        hasRedeemed,
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
   * 根据uuid查询单个
   */
  getDetailByUuid(uuid: string): Promise<User> {
    return this.userRepository.findOneBy({ uuid });
  }

  /*
   * 根据openId查询单个
   */
  getDetailByOpenId(openId: string): Promise<User> {
    return this.userRepository.findOneBy({ openId });
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
