class TransactionSubcategory{
  readonly id?: string;
  name: string;
  user: number;


  constructor(props: TransactionSubcategory) {
    this.id = props.id;
    this.name = props.name;
    this.user = props.user;
  }
}

export default TransactionSubcategory;
