import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { Tag } from '../../../tags/entities/tag.entity';
import { CreateTagDto } from '../../../tags/dtos/create-tag.dto';

export class UpdateTransactionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty()
  @IsNumber()
  @Transform((params) => {
    if (params.obj.type === TransactionTypeEnum.outComing) {
      return -Math.abs(Number(params.value));
    }
    return Math.abs(Number(params.value));
  })
  @IsOptional()
  value?: number;
  @ApiProperty({ example: TransactionTypeEnum.outComing })
  @IsEnum(TransactionTypeEnum)
  @IsOptional()
  type?: TransactionTypeEnum;

  @ApiProperty({ example: new Date() })
  @IsOptional()
  date?: Date;

  @ApiProperty({ example: 'f1316ce5-7dd9-4dae-8c5e-bcfc4755ff49' })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ type: Tag, isArray: true })
  @Type(() => Tag)
  @IsOptional()
  tags?: (Tag | string | CreateTagDto)[];
}
