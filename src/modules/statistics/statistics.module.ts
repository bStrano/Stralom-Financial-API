import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transaction/entities/transaction.entity';
import { CashFlowStatisticsController } from './controllers/cash-flow-statistics.controller';
import { CashFlowStatisticsService } from './services/cash-flow-statistics.service';
import { TransactionStatisticsRepository } from './repositories/transaction-statistics.repository';
import { CashFlowStatisticsPresenter } from './presenters/cash-flow-statistics.presenter';
import { EquityStatisticsController } from './controllers/equity-statistics.controller';
import { InvestmentModule } from '../investments/investment.module';
import { TransactionModule } from '../transaction/transaction.module';
import { EquityStatisticsService } from './services/equity-statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), InvestmentModule, TransactionModule],
  controllers: [CashFlowStatisticsController, EquityStatisticsController],
  providers: [CashFlowStatisticsService, TransactionStatisticsRepository, CashFlowStatisticsPresenter, EquityStatisticsService],
})
export class StatisticsModule {}
