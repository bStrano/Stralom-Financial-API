import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TransactionInterface } from '@core/modules/transactions/entities/TransactionInterface';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategory } from './transaction-category.entity';
import { Tag } from '../../tags/entities/tag.entity';

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
  @ApiProperty({ example: TransactionTypeEnum.outComing })
  @Column()
  type: TransactionTypeEnum;
  @Column()
  userId: number;
  @ManyToOne(() => TransactionCategory, { eager: true })
  @JoinColumn()
  category: TransactionCategory;

  @Column()
  categoryId: string;

  @ApiProperty({ example: new Date() })
  @Column({ type: 'date' })
  date: Date;

  @Column()
  instalmentCurrent: number;

  @Column()
  @ApiProperty({ example: 3 })
  instalments: number;

  @Column()
  referenceTransactionId: string;

  @ManyToOne(() => Transaction)
  @JoinColumn()
  referenceTransaction: Transaction;

  @OneToMany(() => Transaction, (transaction) => transaction.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  childrenTransactions: Transaction[];

  @ManyToMany(() => Tag, (tag) => tag.transactions, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'transaction_tags',
  })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
