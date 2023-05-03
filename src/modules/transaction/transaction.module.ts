import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionCategoryService } from './services/transaction-category.service';
import { TransactionCategoryController } from './controllers/transaction-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionCategory } from './entities/transaction-category.entity';
import { TransactionCategoryRepository } from './repositories/transaction-category.repository';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionStatisticsService } from './services/transaction-statistics.service';
import { TransactionStatisticsRepository } from '../statistics/repositories/transaction-statistics.repository';
import { TransactionStatisticsController } from './controllers/transaction-statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCategory, Transaction])],
  controllers: [TransactionController, TransactionCategoryController, TransactionStatisticsController],
  providers: [
    TransactionService,
    TransactionCategoryService,
    TransactionCategoryRepository,
    TransactionRepository,
    TransactionService,
    TransactionStatisticsService,
    TransactionStatisticsRepository,
  ],
  exports: [TransactionStatisticsService],
})
export class TransactionModule {}
