const pool = require('./connection');
const express = require('express');
const route = express.Router();
var url = require('url');

var response = {};

route.get('/', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var q = url.parse(req.url, true).query;
    var movie_id = q.movie_id;
    var comment = q.comment;
    var character_limit = 500;

    if ((movie_id == null) || (movie_id == '') || ((isNaN(movie_id)))){
        response = { status: "701", message: "No movie id provided"};
        res.send((response));
        return;
    }

    if ((comment == null) || (comment == '')){
        response = { status: "702", message: "No comment provided - "+movie_id+""};
        res.send((response));
        return;
    }

    if (comment.length > character_limit){
        response = { status: "703", message: "The comment is more than "+character_limit+" characters"};
        res.send((response));
        return;
    }

    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    var date = new Date();
    var is_created = false;

    // CHECK IF TABLE HAS BEEN CREATED
    var result = await pool.query('SELECT EXISTS ( SELECT FROM information_schema.tables WHERE  table_schema = \'public\' AND table_name = \'comments\')');

    is_created = result['rows'][0]['exists'];

    if (!(is_created)){
        // CREATE TABLE IF IT IS NOT CREATED
        var result = await pool.query('CREATE TABLE comments (id serial PRIMARY KEY NOT NULL, movie_id int, comment text, ip_address varchar(50), time_number bigint, date_created varchar(50))');
    }

    // INSERT COMMENT INTO TABLE
    var result = await pool.query('INSERT INTO comments (movie_id, comment, ip_address, date_created, time_number) VALUES ($1, $2, $3, $4, $5)', [movie_id, comment, ip, date.toUTCString(), date.getTime()]);

    response = { status: "200", message: "success"};
    res.send((response));
    
});

module.exports = route;