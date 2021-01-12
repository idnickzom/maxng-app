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

const express = require('express');
const route = express.Router();
var url = require('url');


route.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    var q = url.parse(req.url, true).query;
    //var txt = q.year + " " + q.month + " "+ req.method;
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    var date = new Date();
    pool.query('SELECT EXISTS ( SELECT FROM information_schema.tables WHERE  table_schema = \'schema_name\' AND table_name = \'comments\' );', (error, result) => {
        res.end(((result['rows'][0]['exists'] == false) ? 'false' : 'true') + ' - ' + ip + ' - '+ date.getTime() + ' - '+ date.toUTCString());
        pool.end();
    });
});

module.exports = route;