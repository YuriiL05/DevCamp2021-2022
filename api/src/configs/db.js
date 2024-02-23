import config from './config.js';
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
  },
});

export default db;
