import TransactionCategory from '../TransactionCategory/TransactionCategory';

class TransactionSubcategory{
  readonly id?: string;
  name: string;
  user: number;
  category?: TransactionCategory;


  constructor(props: TransactionSubcategory) {
    this.id = props.id;
    this.name = props.name;
    this.user = props.user;
    this.category = props.category;
  }
}

export default TransactionSubcategory;
