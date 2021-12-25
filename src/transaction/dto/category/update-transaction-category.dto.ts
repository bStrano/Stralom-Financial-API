import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionCategoryDto } from './create-transaction-category.dto';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTransactionCategoryDto extends PartialType(CreateTransactionCategoryDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
  @IsArray()
  subcategories: { id: string; name: string }[];
}
