import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

const transactionCategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {type: String, required: true},
  icon: {type: Number, required: true},
  color: {type: String, required: true},
  user: {type: Schema.Types.ObjectId}
})


export default mongoose.model('TransactionCategoryCollection', transactionCategorySchema, 'transactionsCategories');
