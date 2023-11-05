import { IsNull, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Investment } from '../entities/investment.entity';
import { UpdateInvestmentDto } from '../dto/UpdateInvestment.dto';

@Injectable()
export class InvestmentRepository {
  constructor(@InjectRepository(Investment) private investmentRepository: Repository<Investment>) {}

  findAll(userId: number): Promise<Investment[]> {
    return this.investmentRepository.find({ where: { userId }, order: { redemptionDate: 'DESC', startDate: 'DESC' } });
  }

  save(investment: Partial<Investment>): Promise<Investment | null> {
    return this.investmentRepository.save(investment);
  }

  update(id: string, investmentUpdate: Partial<UpdateInvestmentDto>): Promise<UpdateResult> {
    const investment = this.investmentRepository.create(investmentUpdate);
    return this.investmentRepository.update(id, investment);
  }

  findById(id: string): Promise<Investment | null> {
    return this.investmentRepository.findOneBy({ id });
  }

  async findTotal(userId: number): Promise<number> {
    return (await this.investmentRepository.sum('currentAmount', { userId, redemptionDate: IsNull() })) || 0;
  }

  async remove(id: string): Promise<void> {
    await this.investmentRepository.delete(id);
  }
}
