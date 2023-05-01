import { InvestmentTypeRepository } from '../repositories/investment-type.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvestmentTypeService {
  constructor(private repository: InvestmentTypeRepository) {}
  async findAll() {
    return this.repository.findAll();
  }
}
