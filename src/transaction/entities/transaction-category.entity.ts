import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionSubcategory } from './transaction-subcategory.entity';

@Entity('transactions_categories')
export class TransactionCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @Column()
  color: string;

  @Column()
  icon: number;

  @OneToMany(() => TransactionSubcategory, (subcategory) => subcategory.category, { cascade: true })
  subcategories: TransactionSubcategory[];
}
