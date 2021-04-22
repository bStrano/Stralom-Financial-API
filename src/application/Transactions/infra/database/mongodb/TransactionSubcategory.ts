import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';

export interface ITransactionSubcategorySchema extends Document{
  _id: string,
  name: string,
  category: TransactionCategory,
  user: number
}

const transactionSubcategorySchema = new Schema({
  name: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, ref:"TransactionCategoryCollection",required: true},
  user: {type: Number, required: true},
})


export default mongoose.model<ITransactionSubcategorySchema>('TransactionSubcategoryCollection', transactionSubcategorySchema, 'transactionsSubcategories');
