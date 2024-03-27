import type { Knex as KnexType } from 'knex';

const environments: string[] = ['development', 'staging', 'production'];

export const connection: KnexType.ConnectionConfig = {
  user: process.env.POSTGRES_USER || 'local-user',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'db',
  password: process.env.POSTGRES_PASSWORD || 'local-password',
};

const commonConfig: KnexType.Config = {
  client: 'pg',
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'database/migrations',
  },
  seeds: {
    directory: 'database/seeds',
  },
};

export default Object.fromEntries(environments.map((env: string) => [env, commonConfig]));
