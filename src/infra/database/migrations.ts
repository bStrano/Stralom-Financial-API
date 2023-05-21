import { CreateTransactionCategories1671634229173 } from './migrations/1671634229173-CreateTransactionCategories';
import { PopulateTransactionCategories1671637366183 } from './migrations/1671637366183-PopulateTransactionCategories';
import { CreateTransaction1684593140014 } from './migrations/1684593140014-CreateTransaction';
import { CreateInvestmentType1684593245601 } from './migrations/1684593245601-CreateInvestmentType';
import { CreateInvestment1684593248976 } from './migrations/1684593248976-CreateInvestment';
import { PopulateInvestmentType1684596305320 } from './migrations/1684596305320-PopulateInvestmentType';

export const MIGRATIONS = [
  CreateTransactionCategories1671634229173,
  PopulateTransactionCategories1671637366183,
  CreateTransaction1684593140014,
  CreateInvestmentType1684593245601,
  CreateInvestment1684593248976,
  PopulateInvestmentType1684596305320,
];
