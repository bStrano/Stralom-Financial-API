import DateProviderInterface from '../DateProviderInterface';
import { DateUnitEnum } from '../constants/DateUnitEnum';
import * as dayjs from 'dayjs';

export class DayjsDateProvider extends DateProviderInterface {
  add(date: Date, value: number, granularity: Exclude<DateUnitEnum, 'date'>): Date {
    return dayjs(date).add(value, granularity).toDate();
  }
}
