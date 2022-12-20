import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  color: string;
  @IsNotEmpty()
  @IsNumber()
  icon: number;
  @IsArray()
  subcategories: { name: string }[];
}
