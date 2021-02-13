const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  database: "dbshool",
  port: 5432
});
