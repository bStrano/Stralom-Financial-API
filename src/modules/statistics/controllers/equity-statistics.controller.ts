import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { EquityStatisticsService } from '../services/equity-statistics.service';
import { EquityStatisticsPresenter } from '../presenters/equity.statistics.presenter';
import { GetEquityEvolutionQueryParamsDto } from '../dtos/GetEquityEvolution.dto';

@Controller('statistics/equity')
@ApiTags('Statistics - Equity')
@UseInterceptors(ClassSerializerInterceptor)
export class EquityStatisticsController {
  constructor(private equityStatisticsService: EquityStatisticsService, private equityStatisticsPresenter: EquityStatisticsPresenter) {}

  @Get('/distribution')
  @ApiBearerAuth()
  async getEquityDistribution(@RequestUser() user: JWTPayload) {
    return this.equityStatisticsService.getEquityDistribution(user.userId);
  }

  @Get('/evolution')
  @ApiBearerAuth()
  async getEquityEvolution(@RequestUser() user: JWTPayload, @Query() queryParamsDto: GetEquityEvolutionQueryParamsDto) {
    const equityEvolution = await this.equityStatisticsService.getEquityEvolution(user.userId);
    if (queryParamsDto.format === 'accumulated') {
      return this.equityStatisticsPresenter.formatAccumulatedValuesOnly(equityEvolution);
    }
    return equityEvolution;
  }
}
