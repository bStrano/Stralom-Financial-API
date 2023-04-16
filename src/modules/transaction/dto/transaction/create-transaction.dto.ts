import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  @Transform((params) => {
    if (params.obj.type === TransactionTypeEnum.outComing) {
      return -Math.abs(Number(params.value));
    }
    return Math.abs(Number(params.value));
  })
  value: number;
  @ApiProperty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;
}
