import { InvestmentType } from '../../modules/investments/entities/investment-type.entity';
import { Investment } from '../../modules/investments/entities/investment.entity';
import { TransactionCategory } from '../../modules/transaction/entities/transaction-category.entity';
import { Transaction } from '../../modules/transaction/entities/transaction.entity';
import { Tag } from '../../modules/tags/entities/tag.entity';

export const ENTITIES = [Investment, InvestmentType, TransactionCategory, Transaction, Tag];
