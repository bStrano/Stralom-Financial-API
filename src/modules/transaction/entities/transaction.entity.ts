import { TransactionTypeEnum } from './transaction-type.enum';

export class Transaction {
  id: number;
  description: string;
  value: number;
  type: TransactionTypeEnum;
}
