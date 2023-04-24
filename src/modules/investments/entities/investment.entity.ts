import { InvestmentType } from './investment-type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity()
export class Investment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  startDate: Date;
  @ApiProperty()
  @Column()
  redemptionDate: Date;
  @ApiProperty()
  @Column()
  currentAmount: number;
  @ApiProperty()
  @Column()
  appliedAmount: number;
  @ApiProperty()
  @ManyToOne(() => InvestmentType)
  type: InvestmentType;

  @Expose()
  get rentability() {
    return ((this.currentAmount - this.appliedAmount) * 100) / this.appliedAmount;
  }
}
