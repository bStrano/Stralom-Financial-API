import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction_categories')
export class TransactionCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  color!: string;

  @Column()
  icon!: string;

  constructor(props?: TransactionCategory) {
    if (props) {
      this.id = props.id;
      this.name = props.name;
      this.color = props.color;
      this.icon = props.icon;
    }
  }
}
