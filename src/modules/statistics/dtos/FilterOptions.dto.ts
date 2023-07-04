import { FilterOptionsDtoInterface } from '@core/modules/statistics/dtos/FilterOptionsDtoInterface';
import { IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { startOfDay } from 'date-fns';

export class FilterOptionsDto implements FilterOptionsDtoInterface {
  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Transform((params) => startOfDay(new Date(params.obj.startDate)))
  startDate?: Date;
  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Transform((params) => startOfDay(new Date(params.obj.endDate)))
  endDate?: Date;
}
