import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InvestmentTypeInterface } from '@core/modules/investments/entities/InvestmentTypeInterface';

@Entity()
export class InvestmentType implements InvestmentTypeInterface {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  name: string;
}
