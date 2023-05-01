import { Injectable } from '@nestjs/common';
import { InvestmentRepository } from '../repositories/Investment.repository';
import { CreateInvestmentDto } from '../dto/CreateInvestment.dto';
import { UpdateInvestmentDto } from '../dto/UpdateInvestment.dto';

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
    return this.repository.save({ ...createInvestmentDto, currentAmount: currentAmount, appliedAmount: createInvestmentDto.appliedAmount, userId });
  }

  async update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    return this.repository.update(id, updateInvestmentDto);
  }

  async delete(id: string) {
    return this.repository.remove(id);
  }
}
