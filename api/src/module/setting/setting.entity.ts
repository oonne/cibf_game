import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ comment: 'settingId', length: 255, nullable: false, unique: true })
  settingId: string;

  @Index({ unique: true })
  @Column({ comment: 'key', length: 255, nullable: false, unique: true })
  key: string;

  @Column({ comment: 'value', type: 'mediumtext', nullable: true })
  value: string;

  @Column({ comment: '备注', type: 'text', nullable: true })
  remark: string;

  @CreateDateColumn({ comment: '创建时间', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间', nullable: false })
  updatedAt: Date;
}
