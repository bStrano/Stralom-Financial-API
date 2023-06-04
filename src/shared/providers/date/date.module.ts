import { Module } from '@nestjs/common';
import { DayjsDateProvider } from './implementations/DayjsDateProvider';
import { DATE_PROVIDER_TOKEN } from './DateProviderInterface';

const DateProviderConfig = {
  provide: DATE_PROVIDER_TOKEN,
  useClass: DayjsDateProvider,
};
@Module({
  providers: [DateProviderConfig],
  exports: [DateProviderConfig],
})
export class DateModule {}
