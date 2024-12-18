const { connectionString } = require("pg/lib/defaults");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "walled",
  password: "postgres",
  port: 5432,
  connectionString: process.env.DB_URL
});

module.exports = pool;
