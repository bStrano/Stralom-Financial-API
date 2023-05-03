import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { EquityStatisticsService } from '../services/equity-statistics.service';

@Controller('statistics/equity')
@ApiTags('Statistics - Equity')
@UseInterceptors(ClassSerializerInterceptor)
export class EquityStatisticsController {
  constructor(private equityStatisticsService: EquityStatisticsService) {}

  @Get('/distribution')
  @ApiBearerAuth()
  async findAll(@RequestUser() user: JWTPayload) {
    return this.equityStatisticsService.getEquityDistribution(user.userId);
  }
}
