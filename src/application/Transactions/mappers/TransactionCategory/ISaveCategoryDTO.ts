import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';

interface ISaveCategoryDTO{
  id: string;
  name: string,
  icon: number,
  color: string,
  subcategories: [{
    _id: string,
    name: string,
    user: number,
    category: TransactionCategory
  }]
}
export default ISaveCategoryDTO;
