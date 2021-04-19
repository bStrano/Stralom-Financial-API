import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import './infra/config/typeorm'
import './infra/config/mongoose'

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/stralom/financial",routes);

export default app;
