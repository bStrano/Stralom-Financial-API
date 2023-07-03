import { InvestmentType } from './investment-type.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { InvestmentInterface } from '@core/modules/investments/entities/InvestmentInterface';
import { InvestmentStatusEnum } from '@core/modules/investments/enums/InvestmentStatusEnum';
import { differenceInMonths } from 'date-fns';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { TransactionCategoryEnum } from '@core/modules/transactions/enums/TransactionCategoryEnum';

@Entity()
export class Investment implements InvestmentInterface {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  startDate: Date;
  @ApiProperty()
  @Column()
  redemptionDate?: Date;
  @ApiProperty()
  @Column()
  currentAmount: number;
  @ApiProperty()
  @Column()
  appliedAmount: number;
  @ApiProperty()
  @ManyToOne(() => InvestmentType, { eager: true })
  type: InvestmentType;
  @ApiProperty()
  @Column()
  typeId: string;
  @Column()
  userId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToOne(() => Transaction, (transaction) => transaction.investment, { cascade: ['insert', 'update'] })
  investmentTransaction?: Transaction;
  @OneToOne(() => Transaction, (transaction) => transaction.investment, { cascade: ['insert', 'update'] })
  redeemedTransaction?: Transaction;

  redeem(currentAmount: number, redemptionDate: Date) {
    this.currentAmount = currentAmount;
    this.redemptionDate = redemptionDate;

    const redeemedValue = this.currentAmount - this.appliedAmount;
    const transactionType = redeemedValue > 0 ? TransactionTypeEnum.incoming : TransactionTypeEnum.outComing;
    const description = `RESGATE ${this.name} - ${this.type.name}`;

    const transaction = new Transaction();
    transaction.instalments = 1;
    transaction.instalmentCurrent = 1;
    transaction.categoryId = TransactionCategoryEnum.INVESTMENTS;
    transaction.type = transactionType;
    transaction.description = description;
    transaction.value = redeemedValue;
    transaction.date = this.redemptionDate;
    transaction.investmentId = this.id;
    transaction.userId = this.userId;
    this.redeemedTransaction = transaction;
  }

  @Expose()
  get rentability() {
    return ((this.currentAmount - this.appliedAmount) * 100) / this.appliedAmount;
  }

  @Expose()
  get rentabilityMonth() {
    const months = differenceInMonths(new Date(), this.startDate);
    return ((this.currentAmount - this.appliedAmount) * 100) / this.appliedAmount / months;
  }

  @Expose()
  get status() {
    if (this.redemptionDate) {
      return InvestmentStatusEnum.REDEEMED;
    } else {
      return InvestmentStatusEnum.APPLIED;
    }
  }
}
