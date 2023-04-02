import { format, sub } from 'date-fns';
import { CashFlowCompiledInterface } from '../interfaces/CashFlowCompiledInterface';
import { Expose } from 'class-transformer';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';

interface CashFlowCompiledSummaryInterface {
  incoming: CashFlowCompiledInterface;
  outComing: CashFlowCompiledInterface;
  balance: CashFlowCompiledInterface;
}

export class CashFlowByDayCompiled {
  private readonly _daysMap = new Map<string, CashFlowCompiledSummaryInterface>();
  private readonly dateFrom: Date;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly dateTo: Date;

  constructor(dateFrom: Date, dateTo: Date, values: CashFlowCompiledInterface[]) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.setupInitialValues();
    values.forEach((item) => {
      this.add(item);
    });
  }

  addOutComing(data: CashFlowCompiledInterface) {
    const key = this.getKey(data);
    const previousValue = this._daysMap.get(key);
    if (!previousValue) throw new Error('Not found');
    this._daysMap.set(key, {
      ...previousValue,
      outComing: data,
      balance: {
        ...previousValue.balance,
        total: previousValue.balance.total - data.total,
        quantity: previousValue.balance.quantity++,
      },
    });
  }

  addIncoming(data: CashFlowCompiledInterface) {
    const key = this.getKey(data);
    const previousValue = this._daysMap.get(key);
    if (!previousValue) throw new Error('Not found');
    this._daysMap.set(key, {
      ...previousValue,
      incoming: data,
      balance: {
        ...previousValue.balance,
        total: previousValue.balance.total + data.total,
        quantity: previousValue.balance.quantity++,
      },
    });
  }

  add(data: CashFlowCompiledInterface) {
    switch (data.type) {
      case TransactionTypeEnum.outComing:
        console.log('outComming');
        return this.addIncoming(data);
      case TransactionTypeEnum.incoming:
        console.log('incoming');

        return this.addOutComing(data);
    }
  }

  private getKey(data: CashFlowCompiledInterface) {
    const month = data.month < 10 ? `0${data.month}` : data.month;
    const day = data.day < 10 ? `0${data.day}` : data.day;
    return `${day}/${month}/${data.year}`;
  }

  setupInitialValues() {
    let auxDate = new Date();
    while (auxDate > this.dateFrom) {
      const key = format(auxDate, 'dd/MM/yyyy');
      this.daysMap.set(key, {
        incoming: {
          total: 0,
          quantity: 0,
          year: auxDate.getFullYear(),
          month: auxDate.getMonth(),
          day: auxDate.getDate(),
          type: TransactionTypeEnum.incoming,
        },
        outComing: {
          total: 0,
          quantity: 0,
          year: auxDate.getFullYear(),
          month: auxDate.getMonth(),
          day: auxDate.getDate(),
          type: TransactionTypeEnum.outComing,
        },
        balance: {
          total: 0,
          quantity: 0,
          year: auxDate.getFullYear(),
          month: auxDate.getMonth(),
          day: auxDate.getDate(),
          type: 'balance',
        },
      });
      auxDate = sub(auxDate, { days: 1 });
    }
  }

  get daysMap(): Map<string, CashFlowCompiledSummaryInterface> {
    return this._daysMap;
  }

  @Expose()
  get days(): any {
    return Array.from(this._daysMap);
  }
}
