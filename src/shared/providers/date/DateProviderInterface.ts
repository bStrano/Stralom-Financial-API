import { Weekday } from './constants/DateWeekEnum';
import { DateUnitEnum } from './constants/DateUnitEnum';

export const DATE_PROVIDER_TOKEN = Symbol('DATE_PROVIDER_TOKEN');
export default abstract class DateProviderInterface {
  abstract add(date: Date, value: number, granularity: Exclude<DateUnitEnum, 'date'>): Date;

  getWeekdayNumber(weekday: Weekday) {
    switch (weekday) {
      case Weekday.SUNDAY:
        return 0;
      case Weekday.MONDAY:
        return 1;
      case Weekday.TUESDAY:
        return 2;
      case Weekday.WEDNESDAY:
        return 3;
      case Weekday.THURSDAY:
        return 4;
      case Weekday.FRIDAY:
        return 5;
      case Weekday.SATURDAY:
        return 6;
    }
  }
}
