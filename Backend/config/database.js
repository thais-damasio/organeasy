if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_DEVUSERNAME,
    password: process.env.DB_DEVPASSWORD,
    database: process.env.DB_DEVDATABASE,
    host: process.env.DB_DEVHOSTNAME,
    port: process.env.DB_DEVPORT,
    dialect: process.env.DB_DEVDIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  },
}