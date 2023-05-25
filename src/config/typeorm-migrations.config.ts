import 'reflect-metadata';

import { initializeEnvinronment } from './envinronment.config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { MIGRATIONS } from '../infra/database/migrations';
import { ENTITIES } from '../infra/database/entities';

initializeEnvinronment();

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [...ENTITIES],
  migrations: [...MIGRATIONS],
  migrationsTransactionMode: 'all',
  migrationsRun: true,
  synchronize: false,
  logging: 'all',
};

const AppDataSource = new DataSource(options);
export default AppDataSource;
