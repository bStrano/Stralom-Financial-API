import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { TransactionTagsStatisticsService } from '../services/transaction-tags-statistics.service';
import { GetTotalByTagDto } from '../dtos/GetTotalByTag.dto';

@Controller('statistics/tags')
@ApiTags('Statistics - Transaction Tags')
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionTagsStatisticsController {
  constructor(private transactionTagsStatisticsService: TransactionTagsStatisticsService) {}

  @Get('/total')
  @ApiBearerAuth()
  async getTotalGroupedByTag(@RequestUser() user: JWTPayload, @Query() getTotalByTagDto?: GetTotalByTagDto) {
    return this.transactionTagsStatisticsService.getTotalGroupedByTag(user.userId, getTotalByTagDto);
  }
}
