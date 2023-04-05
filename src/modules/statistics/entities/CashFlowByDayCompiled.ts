import { add, format } from 'date-fns';
import { CashFlowCompiledInterface } from '../interfaces/CashFlowCompiledInterface';
import { Expose } from 'class-transformer';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import {
  CashFlowByDayCompiledDaysDataInterface,
  CashFlowByDayCompiledDaysInterface,
  CashFlowByDayCompiledInterface,
} from '@core/modules/statistics/CashFlowByDayCompiledInterface';

export class CashFlowByDayCompiled implements CashFlowByDayCompiledInterface {
  private readonly _daysMap = new Map<string, CashFlowByDayCompiledDaysDataInterface>();
  private readonly _dateFrom: Date;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly _dateTo: Date;

  constructor(dateFrom: Date, dateTo: Date, values: CashFlowCompiledInterface[]) {
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this.setupInitialValues();

    values.forEach((item) => {
      this.add(item);
    });

    const mapAsc = new Map(
      [...this._daysMap.entries()].sort(([a], [b]) => {
        return new Date(a).getTime() - new Date(b).getTime();
      }),
    );
    const accumulatedValues: AccumulatedValueInterface = {
      incoming: 0,
      outComing: 0,
      balance: 0,
    };
    mapAsc.forEach((item) => {
      accumulatedValues.balance += item.balance.total;
      accumulatedValues.incoming += item.incoming.total;
      accumulatedValues.outComing += item.outComing.total;
      item.outComing.accumulated = accumulatedValues.outComing;
      item.incoming.accumulated = accumulatedValues.incoming;
      item.balance.accumulated = accumulatedValues.balance;
    });
    this._daysMap = new Map(mapAsc);
  }

  addOutComing(data: CashFlowCompiledInterface) {
    const key = this.getKey(data);
    const previousValue = this._daysMap.get(key);
    if (!previousValue) throw new Error('Not found');
    const outComing = {
      ...data,
    };
    const balance = {
      ...previousValue.balance,
      total: previousValue.balance.total - data.total,
      quantity: previousValue.balance.quantity++,
    };
    this._daysMap.set(key, {
      ...previousValue,
      outComing,
      balance,
    });
  }

  addIncoming(data: CashFlowCompiledInterface) {
    const key = this.getKey(data);
    const previousValue = this._daysMap.get(key);
    if (!previousValue) throw new Error('Not found');

    const balance = {
      ...previousValue.balance,
      total: previousValue.balance.total + data.total,
      quantity: previousValue.balance.quantity++,
    };
    const incoming = {
      ...data,
    };

    this._daysMap.set(key, {
      ...previousValue,
      incoming,
      balance,
    });
  }

  add(data: CashFlowCompiledInterface) {
    switch (data.type) {
      case TransactionTypeEnum.outComing:
        return this.addOutComing(data);
      case TransactionTypeEnum.incoming:
        return this.addIncoming(data);
    }
  }

  private getKey(data: CashFlowCompiledInterface) {
    const month = data.month < 10 ? `0${data.month}` : data.month;
    const day = data.day < 10 ? `0${data.day}` : data.day;
    return `${month}/${day}/${data.year}`;
  }

  setupInitialValues() {
    let auxDate = new Date(this.dateFrom);
    while (auxDate < this.dateTo) {
      const key = format(auxDate, 'MM/dd/yyyy');
      this.daysMap.set(key, {
        incoming: {
          total: 0,
          quantity: 0,
          year: auxDate.getFullYear(),
          month: auxDate.getMonth(),
          day: auxDate.getDate(),
          accumulated: 0,
          type: TransactionTypeEnum.incoming,
        },
        outComing: {
          total: 0,
          quantity: 0,
          accumulated: 0,
          year: auxDate.getFullYear(),
          month: auxDate.getMonth(),
          day: auxDate.getDate(),
          type: TransactionTypeEnum.outComing,
        },
        balance: {
          total: 0,
          quantity: 0,
          accumulated: 0,
          year: auxDate.getFullYear(),
          month: auxDate.getMonth(),
          day: auxDate.getDate(),
          type: 'balance',
        },
      });
      auxDate = add(auxDate, { days: 1 });
    }
  }

  get daysMap(): Map<string, CashFlowByDayCompiledDaysDataInterface> {
    return this._daysMap;
  }

  @Expose()
  get days(): CashFlowByDayCompiledDaysInterface[] {
    const data: CashFlowByDayCompiledDaysInterface[] = [];
    this._daysMap.forEach((value, key) => {
      data.push({ date: key, data: value });
    });
    return data;
  }

  get dateFrom(): Date {
    return this._dateFrom;
  }

  get dateTo(): Date {
    return this._dateTo;
  }
}

interface AccumulatedValueInterface {
  incoming: number;
  outComing: number;
  balance: number;
}
