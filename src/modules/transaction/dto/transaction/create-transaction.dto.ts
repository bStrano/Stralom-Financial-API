import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  value: number;
  @ApiProperty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;
}
