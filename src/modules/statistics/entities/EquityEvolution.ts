import { Expose } from 'class-transformer';
import { ValueByMonthInterface } from '@core/modules/statistics/ValueByMonthInterface';

export class EquityEvolution {
  totalInvested;
  totalBalance;

  constructor(totalInvested: ValueByMonthInterface[], totalBalance: ValueByMonthInterface[]) {
    this.totalInvested = totalInvested;
    this.totalBalance = totalBalance;
  }

  @Expose()
  get evolution() {
    const evolution: ValueByMonthInterface[] = [];
    const mergedValues = [...this.totalInvested, ...this.totalBalance];
    mergedValues.sort((a, b) => {
      return a.year - b.year || a.month - b.month;
    });
    let previousValue: ValueByMonthInterface;
    mergedValues.forEach((item) => {
      if (previousValue && Number(previousValue.year) === Number(item.year) && Number(previousValue.month) === Number(item.month)) {
        const lastEvolutionElement = evolution[evolution.length - 1];
        lastEvolutionElement.quantity += item.quantity;
        lastEvolutionElement.total += item.total;
        lastEvolutionElement.accumulated += item.accumulated;
      } else {
        evolution.push(item);
      }
    });
    return evolution;
  }
}
