import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionCategoryService } from './services/transaction-category.service';
import { TransactionCategoryController } from './controllers/transaction-category.controller';
import { TransactionCategoryRepository } from './repositories/transaction-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCategoryRepository])],
  controllers: [TransactionController, TransactionCategoryController],
  providers: [TransactionService, TransactionCategoryService],
})
export class TransactionModule {}
