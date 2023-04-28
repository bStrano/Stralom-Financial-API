import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvestmentTypeService } from '../services/investment-type.service';

@Controller('investment/types')
@ApiTags('Investimentos - Tipos')
export class InvestmentTypeController {
  constructor(private readonly investmentTypeService: InvestmentTypeService) {}

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.investmentTypeService.findAll();
  }
}
