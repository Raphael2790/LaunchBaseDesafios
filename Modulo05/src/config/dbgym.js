const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "1234",
  database: "gym_manager",
  port: 5432,
  host: "localhost"
});
