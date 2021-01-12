const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
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
    request(options, function (error, response) {
    if (error) throw new Error(error);
        var data = JSON.parse(response.body);
        var repo = {};
        repo['data'] = [];
        for (var i = 0; i < data['results'].length; i++){
          repo['data'][i] = {};
          repo['data'][i]['title'] = data['results'][i]['title'];
          repo['data'][i]['opening_crawl'] = data['results'][i]['opening_crawl'];
          repo['data'][i]['release_date'] = data['results'][i]['release_date'];
          repo['data'][i]['no_comments'] = 0;
        }
        res.end(JSON.stringify(repo));
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/movies`);
});