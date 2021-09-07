import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionCategory } from './transaction-category.entity';

@Entity('transactions_subcategories')
export class TransactionSubcategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @ManyToOne(() => TransactionCategory)
  @JoinColumn({ name: 'category_id' })
  category: TransactionCategory;
}
