import Knex from 'knex';
import configs from '../knexfile';

export const knex = Knex(configs[process.env.NODE_ENV || 'development']);
