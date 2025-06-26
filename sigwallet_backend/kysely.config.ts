import { PostgresDialect } from 'kysely';
import { defineConfig } from 'kysely-ctl';
import { Pool } from 'pg';

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '12345678',
      database: 'blockchain_assignment',
    }),
  }),
  migrations: {
    migrationFolder: 'src/database/migrations',
  },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
