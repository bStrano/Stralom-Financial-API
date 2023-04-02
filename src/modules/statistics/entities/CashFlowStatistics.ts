import { Expose } from 'class-transformer';
import { CashFlowStatisticsInterface } from '@core/modules/statistics/CashFlowStatistcs';

export class CashFlowStatistics implements CashFlowStatisticsInterface {
  private _values: number[];
  private readonly _current: number;
  private readonly _total: number;
  private readonly _percentage: number;
  private readonly _mediumPace: number;

  constructor(values: number[]) {
    this._total = values.reduce((acc, cur) => acc + cur, 0);
    this._mediumPace = this._total / values.length;
    this._current = values.length === 0 ? 0 : values[values.length - 1];
    this._percentage = ((this._current * 100) / this._mediumPace - 100) * -1;
  }

  @Expose({ name: 'values' })
  get values(): number[] {
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
