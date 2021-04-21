class TransactionCategory{
   readonly id?: string;
   name: string;
   color: string;
   icon: number;

  constructor(props: TransactionCategory ) {
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
    this.icon = props.icon;
  }
}

export default TransactionCategory;
