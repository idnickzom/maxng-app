const pool = require('./connection');
const express = require('express');
const route = express.Router();
var url = require('url');

var response = {};

route.get('/', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var result = await pool.query('SELECT * FROM comments ORDER BY id DESC');
    response = {data: result['rows']};
    res.send(response);
});

route.get('/movies/:movie_id', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var movie_id = req.params.movie_id;
    if (isNaN(movie_id)){
        res.send({status: '701', message: 'No movie id provided'});
    }
    movie_id = parseInt(movie_id);
    var result = await pool.query('SELECT * FROM comments WHERE movie_id = \''+movie_id+'\' ORDER BY id DESC');
    response = {data: result['rows']};
    res.send(response);
});

module.exports = route;