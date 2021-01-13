const pool = require('./connection');
const express = require('express');
const route = express.Router();

var repo = {};

route.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://swapi.dev/api/films/',
      'headers': {
    },
    formData: {

    }
    };
    request(options, async function (error, response) {
    if (error) throw new Error(error);
        var data = JSON.parse(response.body);
        repo['data'] = [];
        for (var i = 0; i < data['results'].length; i++){
          repo['data'][i] = {};
          repo['data'][i]['movie_id'] = (i + 1);
          repo['data'][i]['title'] = data['results'][i]['title'];
          repo['data'][i]['opening_crawl'] = data['results'][i]['opening_crawl'];
          repo['data'][i]['release_date'] = data['results'][i]['release_date'];
          // OBTAIN NUMBER OF COMMENTS
          var result = await pool.query('SELECT COUNT(id) as num FROM comments WHERE movie_id = \''+(i + 1)+'\'');
          repo['data'][i]['no_comments'] = result['rows'][0]['num'];
        }
        res.send((repo));
    });
});


module.exports = route;