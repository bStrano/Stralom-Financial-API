import 'reflect-metadata';

import { initializeEnvinronment } from './envinronment.config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

initializeEnvinronment();

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: ['src/infra/database/migrations/*.ts'],

  synchronize: false,
  logging: 'all',
};

const AppDataSource = new DataSource(options);
export default AppDataSource;
