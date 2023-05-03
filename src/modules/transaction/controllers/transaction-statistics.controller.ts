import { Controller, Get } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';

@Controller('transaction/statistics')
@ApiTags('Transactions')
export class TransactionStatisticsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('total')
  @ApiBearerAuth()
  findAll(@RequestUser() user: JWTPayload) {
    return this.transactionService.findTotal(user.userId);
  }
}
