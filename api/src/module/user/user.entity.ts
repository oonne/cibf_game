import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ comment: 'userId', length: 255, nullable: false, unique: true })
  userId: string;

  @Index({ unique: true })
  @Column({ comment: 'uuid', length: 255, nullable: false, unique: true })
  uuid: string;

  @Index({ unique: true })
  @Column({ comment: 'openID', length: 255, nullable: true, unique: true })
  openId: string;

  @Column({ comment: '手机号', length: 255, nullable: true, unique: true })
  phone: string;

  @Column({ comment: '最近访问时间', nullable: false })
  lastVisitTime: Date;

  @Column({ comment: '已玩游戏次数', nullable: false, default: 0 })
  gameTimes: number;

  @Column({ comment: '是否已通关游戏', nullable: false, default: false })
  hasPlayedGame: boolean;

  @Column({ comment: '是否已分享', nullable: false, default: false })
  hasShared: boolean;

  @Column({ comment: '是否已浏览', nullable: false, default: false })
  hasBrowsed: boolean;

  @Column({ comment: '已抽奖次数', nullable: false, default: 0 })
  lotteryTimes: number;

  @Column({ comment: '已中奖品名', nullable: true, length: 255 })
  winningPrizeName: string;

  @Column({ comment: '中奖兑换码Id', nullable: true, length: 255 })
  redeemCodeId: string;

  @Column({ comment: '中奖兑换码', nullable: true, length: 255 })
  redeemCode: string;

  @Column({ comment: '是否已兑奖', nullable: false, default: false })
  hasRedeemed: boolean;

  @Column({ comment: '游戏时间', nullable: true })
  gameTime: Date;

  @Column({ comment: '分享时间', nullable: true })
  sharedTime: Date;

  @Column({ comment: '浏览时间', nullable: true })
  browsedTime: Date;

  @Column({ comment: '中奖时间', nullable: true })
  winningTime: Date;

  @CreateDateColumn({ comment: '创建时间', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间', nullable: false })
  updatedAt: Date;
}
