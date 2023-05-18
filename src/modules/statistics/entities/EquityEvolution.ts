import { Expose } from 'class-transformer';
import { ValueByMonthInterface } from '@core/modules/statistics/ValueByMonthInterface';
import { cloneDeep } from 'lodash';

export class EquityEvolution {
  totalInvested;
  totalBalance;
  private readonly mergedValues;

  constructor(totalInvested: ValueByMonthInterface[], totalBalance: ValueByMonthInterface[]) {
    this.totalInvested = totalInvested;
    this.totalBalance = totalBalance;
    const mergedValues = [...this.totalInvested, ...this.totalBalance];
    mergedValues.sort((a, b) => {
      return a.year - b.year || a.month - b.month;
    });
    this.mergedValues = mergedValues;
  }

  private getDateKey(item: { month: number; year: number }) {
    let key = `${item.month}/${item.year}`;
    if (item.month.toString().length === 1) {
      key = `0${key}`;
    }
    return key;
  }

  @Expose()
  get monthsWithValue() {
    const auxList: { key: string; month: number; year: number }[] = [];
    const auxKeys = new Set();
    this.mergedValues.forEach((item) => {
      const key = this.getDateKey(item);
      const value = {
        key,
        month: item.month,
        year: item.year,
      };
      const alreadyAdded = auxKeys.has(this.getDateKey(item));
      if (!alreadyAdded) {
        auxList.push(value);
        auxKeys.add(key);
      }
    });
    return auxList;
  }

  @Expose()
  get totalInvestedEveryMonth() {
    return this.monthsWithValue.map((item) => {
      const value = this.totalInvested.find((investment) => this.getDateKey(investment) === this.getDateKey(item));
      return {
        ...item,
        value,
      };
    });
  }

  @Expose()
  get totalBalanceEveryMonth() {
    return this.monthsWithValue.map((item) => {
      const value = this.totalBalance.find((balance) => this.getDateKey(balance) === this.getDateKey(item));
      return {
        ...item,
        value,
      };
    });
  }

  @Expose()
  get evolution() {
    const evolution: ValueByMonthInterface[] = [];

    let previousValue: ValueByMonthInterface;
    let accumulated = 0;
    const mergedValuesClone = cloneDeep(this.mergedValues);
    mergedValuesClone.forEach((item) => {
      accumulated += item.total;
      item.accumulated = accumulated;
      if (previousValue && Number(previousValue.year) === Number(item.year) && Number(previousValue.month) === Number(item.month)) {
        const lastEvolutionElement = evolution[evolution.length - 1];
        lastEvolutionElement.quantity += item.quantity;
        lastEvolutionElement.total += item.total;
        lastEvolutionElement.accumulated = accumulated;
      } else {
        evolution.push(item);
      }
    });
    return evolution;
  }
}
