import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TransactionCategoryService } from '../services/transaction-category.service';
import { CreateTransactionCategoryDto } from '../dto/category/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from '../dto/category/update-transaction-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('transaction-category')
@ApiTags('Transactions - Categories')
export class TransactionCategoryController {
  constructor(private readonly transactionCategoryService: TransactionCategoryService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTransactionCategoryDto: CreateTransactionCategoryDto) {
    return this.transactionCategoryService.create(createTransactionCategoryDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query('subcategories') withSubcategories?: boolean) {
    if (withSubcategories) {
      return this.transactionCategoryService.findAllWithSubcategories();
    }
    return this.transactionCategoryService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.transactionCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return this.transactionCategoryService.update(id, updateTransactionCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.transactionCategoryService.remove(id);
  }
}
