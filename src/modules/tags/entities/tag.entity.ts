import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagInterface } from '@core/modules/tags/entities/TagInterface';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity()
export class Tag implements TagInterface {
  @ApiProperty({ example: '311d1a6d-5676-484a-ae30-226eece22989' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({ example: 'Tag 1' })
  @Column()
  name: string;
  @ApiProperty({ example: '#231553' })
  @Column()
  color: string;
  @ApiProperty({ example: 1 })
  @Column()
  userId: number;
  @ManyToMany(() => Transaction, (transaction) => transaction.tags)
  transactions: Transaction[];
}
