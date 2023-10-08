import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dto/transaction/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/transaction/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { PaginationDto } from '../../../shared/dtos/pagination/pagination.dto';

@Controller('transaction')
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTransactionDto: CreateTransactionDto, @RequestUser() user: JWTPayload) {
    return this.transactionService.create(createTransactionDto, user.userId);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@RequestUser() user: JWTPayload) {
    return this.transactionService.findAll(user.userId);
  }

  @Get('/paginated')
  @ApiBearerAuth()
  findAllPaginated(@RequestUser() user: JWTPayload, @Query() queryParams: PaginationDto) {
    return this.transactionService.findAllPaginated(user.userId, queryParams);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
