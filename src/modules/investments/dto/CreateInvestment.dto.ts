import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvestmentDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiProperty()
  @IsNumber()
  typeId: number;
}
