const { Pool } = require('pg');
const pool = new Pool({
  user: 'zeiunhannaaxhr',
  host: 'ec2-54-144-196-35.compute-1.amazonaws.com',
  database: 'd8m0lhn1e17m5l',
  password: 'd659dd35ee0ebbf92baa3687e642406dbe69c6b8ce3f7ca0e98b082e9de5b3c5',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;