const dotenv = require('dotenv');
dotenv.config()

const config={
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}

module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: "mysql",
    operatorsAliases: false
  },
  test: {
    username: config.username,
    password: config.password,
    database: config.database + '_test',
    host: config.host,
    dialect: "mysql",
    operatorsAliases: false
    
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.database + '_production',
    host: config.host,
    dialect: "mysql",
    operatorsAliases: false
  }
}
