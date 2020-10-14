const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "postgres",
  database: "gym_manager",
  port: 5500,
  host: "localhost"
});
