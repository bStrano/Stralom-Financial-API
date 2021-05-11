import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';

export interface ITransactionSubcategorySchema extends Document{
  _id: string,
  name: string,
  category: string,
  user: number
}

const transactionSubcategorySchema = new Schema({
  _id: String,
  name: {type: String, required: true},
  category: {type: Schema.Types.String, ref:"TransactionCategoryCollection",required: true},
  user: {type: Number, required: true},
})


export default mongoose.model<ITransactionSubcategorySchema>('TransactionSubcategoryCollection', transactionSubcategorySchema, 'transactionsSubcategories');
