import TransactionCategory from '../TransactionCategory/TransactionCategory';

class TransactionSubcategory{
  readonly _id?: string;
  name: string;
  user: number;
  category?: TransactionCategory;


  constructor(props: TransactionSubcategory) {
    this._id = props._id;
    this.name = props.name;
    this.user = props.user;
    this.category = props.category;
  }
}

export default TransactionSubcategory;
