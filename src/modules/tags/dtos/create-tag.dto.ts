import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimalWithHash } from '../../../shared/decorators/validators/isHexadecimalWithHash';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsOptional()
  @IsHexadecimalWithHash()
  @ApiProperty({ example: '#ffffff' })
  color?: string;
}
