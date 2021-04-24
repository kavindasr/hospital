require('dotenv').config();

const databaseConnection = {
  development: {
    username: process.env.DEV_USER || 'mysql',
    password: process.env.DEV_PWD || null,
    database: process.env.DEV_DB || 'volunteer',
    host: process.env.DEV_HOST || '127.0.0.1',
    port: process.env.DEV_PORT || '3306',
    dialect: process.env.DEV_DIALECT || 'mysql',
    operatorsAliases: '0',
    timezone: '+05:30',
  },
  test: {
    username: process.env.TEST_USER || 'mysql',
    password: process.env.TEST_PWD || null,
    database: process.env.TEST_DB || 'volunteer',
    host: process.env.TEST_HOST || '127.0.0.1',
    port: process.env.TEST_PORT || '3306',
    dialect: process.env.TEST_DIALECT || 'mysql',
    operatorsAliases: '0',
    timezone: '+05:30',
  },
  production: {
    username: process.env.PROD_USER || 'mysql',
    password: process.env.PROD_PWD || null,
    database: process.env.PROD_DB || 'volunteer',
    host: process.env.PROD_HOST || '127.0.0.1',
    port: process.env.PROD_HOST || '3306',
    dialect: process.env.PROD_DIALECT || 'mysql',
    operatorsAliases: '0',
    timezone: '+05:30',
  },
};

module.exports = databaseConnection;
