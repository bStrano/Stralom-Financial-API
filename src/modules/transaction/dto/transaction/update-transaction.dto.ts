import { CreateTransactionDto } from './create-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../../../tags/entities/tag.entity';
import { Type } from 'class-transformer';

export class UpdateTransactionDto extends CreateTransactionDto {
  @ApiProperty({ type: Tag, isArray: true })
  @Type(() => Tag)
  tags: Tag[];
}
