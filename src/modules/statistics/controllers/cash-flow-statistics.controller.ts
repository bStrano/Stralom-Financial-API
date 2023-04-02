import { ClassSerializerInterceptor, Controller, Get, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { CashFlowStatisticsService } from '../services/cash-flow-statistics.service';

@Controller('statistics/cash-flow')
@ApiTags('Statistics - Cashflow')
@UseInterceptors(ClassSerializerInterceptor)
export class CashFlowStatisticsController {
  constructor(private transactionStatisticsService: CashFlowStatisticsService) {}

  @Get()
  @ApiBearerAuth()
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  findAll(@RequestUser() user: JWTPayload) {
    return this.transactionStatisticsService.getCashFlowStatistics(user.userId);
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
  getExpensesTotalCompiledByCategory(@RequestUser() user: JWTPayload) {
    return this.transactionStatisticsService.getExpensesTotalCompiledByCategory(user.userId);
  }
}
