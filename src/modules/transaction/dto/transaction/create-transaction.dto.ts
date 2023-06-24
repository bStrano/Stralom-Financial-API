import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Tag } from '../../../tags/entities/tag.entity';

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
  @ApiProperty({ example: TransactionTypeEnum.outComing })
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;
  @IsNumber()
  @Max(24)
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ example: 4 })
  instalments: number;

  @ApiProperty({ example: new Date() })
  date: Date;

  @ApiProperty({ example: 'f1316ce5-7dd9-4dae-8c5e-bcfc4755ff49' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ type: Tag, isArray: true })
  @Type(() => Tag)
  tags: (Tag | string)[];
}
