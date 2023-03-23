import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionInterface } from '@core/modules/transactions/entities/TransactionInterface';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction implements TransactionInterface {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  description: string;
  @ApiProperty()
  @Column()
  value: number;
  @ApiProperty()
  @Column()
  type: TransactionTypeEnum;
  @Column()
  userId: number;
}
