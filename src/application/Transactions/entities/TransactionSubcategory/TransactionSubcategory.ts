class TransactionSubcategory{
  private readonly id?: string;
  private name: string;


  constructor(props: TransactionSubcategory) {
    this.id = props.id;
    this.name = props.name;
  }
}

export default TransactionSubcategory;
