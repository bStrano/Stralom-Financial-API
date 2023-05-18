import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../../shared/decorators/user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { InvestmentStatisticsService } from '../services/investment-statistics.service';

@Controller('investments/statistics')
@ApiTags('Investments - Statistics')
export class InvestmentStatisticsController {
  constructor(private readonly investmentStatisticsService: InvestmentStatisticsService) {}

  @Get('/total')
  @ApiBearerAuth()
  findAll(@RequestUser() user: JWTPayload) {
    return this.investmentStatisticsService.findTotal(user.userId);
  }

  @Get('/accumulated/month')
  @ApiBearerAuth()
  getAccumulatedMonth(@RequestUser() user: JWTPayload) {
    return this.investmentStatisticsService.findAccumulatedByMonth(user.userId);
  }
}
