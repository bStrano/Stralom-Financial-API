import {Container} from 'inversify';
import containerTransaction from '../../application/Transactions/config/inversify.config';

const container = new Container();
container.load(containerTransaction);


export default container;
