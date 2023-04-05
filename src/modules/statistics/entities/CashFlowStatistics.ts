import { Expose } from 'class-transformer';
import { CashFlowStatisticsInterface } from '@core/modules/statistics/CashFlowStatistcs';
import { CashFlowCompiledInterface } from '@core/modules/statistics/CashFlowCompiledInterface';

export class CashFlowStatistics implements CashFlowStatisticsInterface {
  private readonly _values: CashFlowCompiledInterface[];
  private readonly _current: number;
  private readonly _total: number;
  private readonly _percentage: number;
  private readonly _mediumPace: number;

  constructor(values: CashFlowCompiledInterface[]) {
    const rawValues = values.map((item) => item.total);
    this._total = rawValues.reduce((acc, cur) => acc + cur, 0);
    this._mediumPace = this._total / values.length;
    this._current = rawValues.length === 0 ? 0 : rawValues[values.length - 1];
    this._percentage = ((this._current * 100) / this._mediumPace - 100) * -1;
    this._values = values;
  }

  @Expose({ name: 'values' })
  get values(): CashFlowCompiledInterface[] {
    return this._values;
  }
  @Expose({ name: 'mediumPace' })
  get mediumPace(): number {
    return this._mediumPace;
  }

  @Expose({ name: 'current' })
  get current(): number {
    return this._current;
  }

  @Expose({ name: 'total' })
  get total(): number {
    return this._total;
  }

  @Expose({ name: 'percentage' })
  get percentage(): number {
    return this._percentage;
  }
}
