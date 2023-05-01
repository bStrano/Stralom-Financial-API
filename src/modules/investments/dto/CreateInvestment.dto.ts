import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInvestmentDTOInterface } from '@core/modules/investments/dtos/CreateInvestmentDTOInterface';

export class CreateInvestmentDto implements CreateInvestmentDTOInterface {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;
  @ApiProperty()
  @IsNumber()
  appliedAmount: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  currentAmount?: number;
  @ApiProperty()
  @IsUUID()
  typeId: string;
}
