import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InvestmentType } from '../entities/investment-type.entity';

@Injectable()
export class InvestmentTypeRepository {
  constructor(@InjectRepository(InvestmentType) private repository: Repository<InvestmentType>) {}
  async findAll() {
    return this.repository.find({ order: { name: 'ASC' } });
  }
}
