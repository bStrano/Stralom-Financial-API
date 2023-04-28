import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Investment } from '../entities/investment.entity';

@Injectable()
export class InvestmentRepository {
  constructor(@InjectRepository(Investment) private investmentRepository: Repository<Investment>) {}

  findAll(userId: number): Promise<Investment[]> {
    return this.investmentRepository.find({ where: { userId }, order: { startDate: 'DESC' } });
  }

  save(investment: Partial<Investment>): Promise<Investment | null> {
    return this.investmentRepository.save(investment);
  }

  update(id: string, investment: Partial<Investment>): Promise<UpdateResult> {
    return this.investmentRepository.update(id, investment);
  }

  findById(id: string): Promise<Investment | null> {
    return this.investmentRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.investmentRepository.delete({ id });
  }
}
