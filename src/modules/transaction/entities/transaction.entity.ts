import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TransactionInterface } from '@core/modules/transactions/entities/TransactionInterface';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategory } from './transaction-category.entity';

@Entity()
export class Transaction implements TransactionInterface {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  description: string;
  @ApiProperty()
  @Column()
  value: number;
  @ApiProperty()
  @Column()
  type: TransactionTypeEnum;
  @Column()
  userId: number;
  @ManyToOne(() => TransactionCategory, { eager: true })
  @JoinColumn()
  category: TransactionCategory;
  @Column({ type: 'timestamptz' })
  date: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
