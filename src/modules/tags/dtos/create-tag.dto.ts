import { IsHexadecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsOptional()
  @IsHexadecimal()
  @ApiProperty({ example: '#ffffff' })
  color?: string;
}
