const express = require('express');
const app = express();
const movies = require('./api/movies');
const comment = require('./api/comment');
const comments = require('./api/comments');
const characters = require('./api/characters');

app.use(express.json());


app.get('/', (req,res) => {
    res.send('Nicholas Idoko\'s Max NG App');
});

app.use('/api/movies', movies);
app.use('/api/comment', comment);
app.use('/api/comments', comments);
app.use('/api/characters', characters);


app.get('*', function (req, res) {
    res.send({status: '808', message: 'Path not found in API'});
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Server started on Port ${port}`));