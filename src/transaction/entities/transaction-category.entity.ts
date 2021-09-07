import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions-categories')
export class TransactionCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;
}
