const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  database: "my_teacher",
  port: 5432
});
