const express = require('express');
const app = express();
const movies = require('./api/movies');
const comment = require('./api/comment');

app.use(express.json());


app.get('/', (req,res) => {
    res.send('Nicholas Idoko\'s Max NG App');
});

app.use('/api/movies', movies);
app.use('/api/comment', comment);


const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Server started on Port ${port}`));