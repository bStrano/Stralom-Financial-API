import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';

interface ISaveCategoryDTO{
  _id: string;
  name: string,
  icon: number,
  color: string,
  subcategories: [{
    _id: string,
    name: string,
    category: TransactionCategory,
    user: number,
  }]
  user: number,
}
export default ISaveCategoryDTO;
