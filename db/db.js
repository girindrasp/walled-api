const { connectionString } = require("pg/lib/defaults");

const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: process.env.DB_URL
});

module.exports = pool;
