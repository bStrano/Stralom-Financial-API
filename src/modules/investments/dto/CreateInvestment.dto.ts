import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
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
  amount: number;
  @ApiProperty()
  @IsNumber()
  typeId: number;
}
