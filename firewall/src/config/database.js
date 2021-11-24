const logger = require('./winston');

require('dotenv').config();

let log;
process.env.DB_LOGGING === 'true'
  ? log = (msg) => logger.debug(msg)
  : log = false;

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: '-03:00',
  logging: log,
  define: {
    timestamps: true,
  },
};
