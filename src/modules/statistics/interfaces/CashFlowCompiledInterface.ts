import { TransactionTypeEnum } from '../../transaction/entities/transaction-type.enum';

export interface CashFlowCompiledInterface {
  total: number;
  quantity: number;
  year: number;
  month: number;
  day: number;
  type: TransactionTypeEnum | 'balance';
}
