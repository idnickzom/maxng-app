const express = require('express');
const app = express();
const router = require('./router');

app.use(express.json());


app.get('/', (req,res) => {
    res.send('Nicholas Idoko\'s Max NG App');
})










const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Server started on Port ${port}`));