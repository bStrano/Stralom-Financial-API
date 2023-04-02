import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transaction/entities/transaction.entity';
import { CashFlowStatisticsController } from './controllers/cash-flow-statistics.controller';
import { CashFlowStatisticsService } from './services/cash-flow-statistics.service';
import { TransactionStatisticsRepository } from './repositories/transaction-statistics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [CashFlowStatisticsController],
  providers: [CashFlowStatisticsService, TransactionStatisticsRepository],
})
export class StatisticsModule {}
