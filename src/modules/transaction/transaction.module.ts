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

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCategory, Transaction])],
  controllers: [TransactionController, TransactionCategoryController],
  providers: [TransactionService, TransactionCategoryService, TransactionCategoryRepository, TransactionRepository, TransactionService],
})
export class TransactionModule {}
