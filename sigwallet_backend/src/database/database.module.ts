import { Module } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './types';

const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => {
        return new Kysely<Database>({
          dialect: new PostgresDialect({
            pool: new Pool({
              host: 'localhost',
              port: 5432,
              user: 'postgres',
              password: '12345678',
              database: 'blockchain_assignment',
            }),
          }),
        });
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
