import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { InvestmentType } from './entities/investment-type.entity';
import { InvestmentTypeController } from './controllers/investment-type.controller';
import { InvestmentTypeService } from './services/investment-type.service';
import { InvestmentTypeRepository } from './repositories/investment-type.repository';
import { InvestmentRepository } from './repositories/Investment.repository';
import { InvestmentService } from './services/Investiment.service';
import { InvestmentController } from './controllers/Investment.controller';
import { InvestmentStatisticsController } from './controllers/investment-statistics.controller';
import { InvestmentStatisticsService } from './services/investment-statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investment, InvestmentType])],
  controllers: [InvestmentTypeController, InvestmentController, InvestmentStatisticsController],
  providers: [InvestmentTypeService, InvestmentTypeRepository, InvestmentRepository, InvestmentService, InvestmentStatisticsService],
  exports: [InvestmentStatisticsService],
})
export class InvestmentModule {}
