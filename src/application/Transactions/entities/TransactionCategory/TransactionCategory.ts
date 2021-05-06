import TransactionSubcategory from '../TransactionSubcategory/TransactionSubcategory';

class TransactionCategory{
   readonly id?: string;
   name: string;
   color: string;
   icon: number;
   subcategories?: TransactionSubcategory[];

  constructor(props: TransactionCategory ) {
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
    this.icon = props.icon;
    this.subcategories = props.subcategories;

    // this.validate();

  }

  // validate(): void{
  //   if(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(this.color)) {
  //     throw new ClassValidationError("Invalid Color")
  //   }
  // }
}

export default TransactionCategory;
