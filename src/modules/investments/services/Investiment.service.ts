import { Injectable, NotFoundException } from '@nestjs/common';
import { InvestmentRepository } from '../repositories/Investment.repository';
import { CreateInvestmentDto } from '../dto/CreateInvestment.dto';
import { UpdateInvestmentDto } from '../dto/UpdateInvestment.dto';
import { RedeemInvestmentDto } from '../dto/RedeemInvestment.dto';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { TransactionCategoryEnum } from '@core/modules/transactions/enums/TransactionCategoryEnum';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';

@Injectable()
export class InvestmentService {
  constructor(private repository: InvestmentRepository) {}
  async findAll(userId: number) {
    return this.repository.findAll(userId);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async create(userId: number, createInvestmentDto: CreateInvestmentDto) {
    const currentAmount = createInvestmentDto.currentAmount ?? createInvestmentDto.appliedAmount;
    const description = `APLICAÇÃO ${createInvestmentDto.name}`;
    const transaction = new Transaction();
    transaction.instalments = 1;
    transaction.instalmentCurrent = 1;
    transaction.categoryId = TransactionCategoryEnum.INVESTMENTS;
    transaction.type = TransactionTypeEnum.outComing;
    transaction.description = description;
    transaction.value = createInvestmentDto.appliedAmount * -1;
    transaction.date = createInvestmentDto.startDate;
    transaction.userId = userId;
    return this.repository.save({
      ...createInvestmentDto,
      currentAmount: currentAmount,
      appliedAmount: createInvestmentDto.appliedAmount,
      userId,
      investmentTransaction: transaction,
    });
  }

  async update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    return this.repository.update(id, updateInvestmentDto);
  }

  async redeem(id: string, redeemInvestmentDto: RedeemInvestmentDto) {
    const investment = await this.findById(id);
    if (!investment) throw new NotFoundException('Investment not found');
    investment.redeem(redeemInvestmentDto.currentValue, redeemInvestmentDto.redeemDate);
    return this.repository.save(investment);
  }

  async delete(id: string) {
    return this.repository.remove(id);
  }
}
