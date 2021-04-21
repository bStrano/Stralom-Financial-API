import {Container} from 'inversify';
import containerTransactionCategory from '../../application/Transactions/config/inversify.config';

const container = new Container();
container.load(containerTransactionCategory);


export default container;
