import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ENTITIES } from '../infra/database/entities';
import * as fs from 'fs';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<any> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      entities: [...ENTITIES],
      cli: {
        migrationsDir: __dirname + '/src/infra/database/migrations',
      },
      synchronize: false,
      logging: true,
      ssl: {
        ca: process.env.SSL_CERT,
      },
    };
  },
};
