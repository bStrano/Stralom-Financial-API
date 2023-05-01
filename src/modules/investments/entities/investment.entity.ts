import { InvestmentType } from './investment-type.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { InvestmentInterface } from '@core/modules/investments/entities/InvestmentInterface';
import { InvestmentStatusEnum } from '@core/modules/investments/enums/InvestmentStatusEnum';

@Entity()
export class Investment implements InvestmentInterface {
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
  @ManyToOne(() => InvestmentType, { eager: true })
  type: InvestmentType;
  @ApiProperty()
  @Column()
  typeId: string;
  @Column()
  userId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @Expose()
  get rentability() {
    return ((this.currentAmount - this.appliedAmount) * 100) / this.appliedAmount;
  }

  @Expose()
  get status() {
    if (this.redemptionDate) {
      return InvestmentStatusEnum.REDEEMED;
    } else {
      return InvestmentStatusEnum.APPLIED;
    }
  }
}
