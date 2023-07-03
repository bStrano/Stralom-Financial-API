import { RedeemInvestmentDTOInterface } from '@core/modules/investments/dtos/RedeemInvestmentDTOInterface';
import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RedeemInvestmentDto implements RedeemInvestmentDTOInterface {
  @ApiProperty()
  @IsNumber()
  currentValue: number;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  redeemDate: Date;
}
