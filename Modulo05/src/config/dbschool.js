const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "my_teacher",
  port: 5500
});
