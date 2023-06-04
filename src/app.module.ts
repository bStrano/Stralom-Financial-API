import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from './config/env.config';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config-nest';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { InvestmentModule } from './modules/investments/investment.module';
import { TagsModule } from './modules/tags/tags.module';
import { DateModule } from './shared/providers/date/date.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    DateModule,
    TransactionModule,
    InvestmentModule,
    AuthModule,
    StatisticsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    AppService,
  ],
})
export class AppModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  constructor(private dataSource: DataSource) {}
}
