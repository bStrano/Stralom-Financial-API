import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';

export interface ITransactionCategorySchema extends Document{
  _id: string,
  name: string,
  icon: number,
  color: string,
  // TODO: Refactor when the user module is implemented
  user: string
}

const transactionCategorySchema = new Schema({
  _id: String,
  name: {type: String, required: true},
  icon: {type: Number, required: true},
  color: {type: String, required: true},
  user: {type: Schema.Types.ObjectId},
  subcategories: [{type: String, ref: 'TransactionSubcategoryCollection'}]
})


export default mongoose.model<ITransactionCategorySchema>('TransactionCategoryCollection', transactionCategorySchema, 'transactionsCategories');