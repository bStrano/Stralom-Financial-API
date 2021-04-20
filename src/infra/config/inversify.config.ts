import {Container} from 'inversify';
import containerTransactionCategory from '../../application/Transactions/config/inversify.config';

let container = new Container();
container.load(containerTransactionCategory);


export default container;
