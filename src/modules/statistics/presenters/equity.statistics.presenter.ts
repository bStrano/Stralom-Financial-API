import { Injectable } from '@nestjs/common';
import { EquityEvolution } from '../entities/EquityEvolution';

@Injectable()
export class EquityStatisticsPresenter {
  formatAccumulatedValuesOnly(equityEvolution: EquityEvolution): any {
    let investmentAux = 0;
    let balanceAux = 0;
    return {
      months: equityEvolution.monthsWithValue.map((item) => item.key),
      total: equityEvolution.evolution.map((item) => item.accumulated),
      investment: equityEvolution.totalInvestedEveryMonth.map((item) => {
        if (item.value?.accumulated) investmentAux = item.value.accumulated;
        return item.value?.accumulated || investmentAux;
      }),
      balance: equityEvolution.totalBalanceEveryMonth.map((item) => {
        if (item.value?.accumulated) balanceAux = item.value.accumulated;
        return item.value?.accumulated || balanceAux;
      }),
    };
  }
}
