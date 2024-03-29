import { CreateTransactionCategories1671634229173 } from './migrations/1671634229173-CreateTransactionCategories';
import { PopulateTransactionCategories1671637366183 } from './migrations/1671637366183-PopulateTransactionCategories';
import { CreateTransaction1684593140014 } from './migrations/1684593140014-CreateTransaction';
import { CreateInvestmentType1684593245601 } from './migrations/1684593245601-CreateInvestmentType';
import { CreateInvestment1684593248976 } from './migrations/1684593248976-CreateInvestment';
import { PopulateInvestmentType1684596305320 } from './migrations/1684596305320-PopulateInvestmentType';
import { AddColumnsInstalmentTransaction1684977174676 } from './migrations/1684977174676-AddColumnsInstalmentTransaction';
import { CreateTag1685576219235 } from './migrations/1685576219235-CreateTag';
import { AddColumnInvestmentTransaction1688320671292 } from './migrations/1688320671292-AddColumnInvestmentTransaction';

export const MIGRATIONS = [
  CreateTransactionCategories1671634229173,
  PopulateTransactionCategories1671637366183,
  CreateTransaction1684593140014,
  CreateInvestmentType1684593245601,
  CreateInvestment1684593248976,
  PopulateInvestmentType1684596305320,
  AddColumnsInstalmentTransaction1684977174676,
  CreateTag1685576219235,
  AddColumnInvestmentTransaction1688320671292,
];
