const { Pool } = require("pg");

module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME_SCHOOL,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
});
