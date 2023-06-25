import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTotalByTagDto {
  @ApiProperty({ required: false, example: new Date() })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start?: Date;
  @ApiProperty({ required: false, example: new Date() })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end?: Date;
  @ApiProperty({ required: false, example: TransactionTypeEnum.outComing })
  @IsEnum(TransactionTypeEnum)
  @IsOptional()
  type?: TransactionTypeEnum;
}
