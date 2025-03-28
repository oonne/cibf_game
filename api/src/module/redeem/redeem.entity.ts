import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { prizeTypeDesc } from '../../constant/prize';

@Entity()
export class Redeem {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ comment: '兑奖码ID', length: 255, nullable: false, unique: true })
  redeemCodeId: string;

  @Index({ unique: true })
  @Column({ comment: '兑奖码', length: 255, nullable: true, unique: true })
  redeemCode: string;

  @Column({ comment: `奖品: ${prizeTypeDesc}`, type: 'int', nullable: false })
  prizeType: number;

  @Column({ comment: '是否已发放', nullable: false, default: false })
  isIssued: boolean;

  @Column({ comment: '发放时间', nullable: true })
  issuedTime: Date;

  @Column({ comment: '发放用户ID', length: 255, nullable: true })
  issuedUserId: string;

  @Column({ comment: '发放用户手机号', length: 255, nullable: true })
  issuedUserPhone: string;

  @Column({ comment: '是否已兑换', nullable: false, default: false })
  isRedeemed: boolean;

  @Column({ comment: '兑换时间', nullable: true })
  redeemedTime: Date;

  @CreateDateColumn({ comment: '创建时间', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间', nullable: false })
  updatedAt: Date;
}
