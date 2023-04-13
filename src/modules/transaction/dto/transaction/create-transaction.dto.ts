import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNegative, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  @IsNegative()
  @Type(() => Number)
  @Transform((params) => {
    return -Math.abs(Number(params.value));
  })
  value: number;
  @ApiProperty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;
}
