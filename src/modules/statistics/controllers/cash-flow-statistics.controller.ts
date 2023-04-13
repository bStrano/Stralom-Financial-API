import { ClassSerializerInterceptor, Controller, Get, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { CashFlowStatisticsService } from '../services/cash-flow-statistics.service';
import { CashFlowStatisticsPresenter } from '../presenters/cash-flow-statistics.presenter';

@Controller('statistics/cash-flow')
@ApiTags('Statistics - Cashflow')
@UseInterceptors(ClassSerializerInterceptor)
export class CashFlowStatisticsController {
  constructor(private transactionStatisticsService: CashFlowStatisticsService, private transactionStatisticsPresenter: CashFlowStatisticsPresenter) {}

  @Get()
  @ApiBearerAuth()
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findAll(@RequestUser() user: JWTPayload) {
    const data = await this.transactionStatisticsService.getCashFlowStatistics(user.userId);
    return this.transactionStatisticsPresenter.formatCashFlowSummaryWithAbsoluteValuesOnly(data);
  }

  @Get('day/complete')
  @ApiBearerAuth()
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  getTransactionsTotalCompiledByDay(@RequestUser() user: JWTPayload) {
    return this.transactionStatisticsService.getTransactionsTotalCompiledByDay(user.userId);
  }

  @Get('category/expenses')
  @ApiBearerAuth()
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async getExpensesTotalCompiledByCategory(@RequestUser() user: JWTPayload) {
    const data = await this.transactionStatisticsService.getExpensesTotalCompiledByCategory(user.userId);
    return this.transactionStatisticsPresenter.formatExpensesTotalCompiledByCategoryWithAbsoluteValuesOnly(data);
  }
}
