const express = require('express');

const app = express();

const middleware = (req, res, next) => {
    // res.send('123');
    req.userId = 100;
    next();
}

app.get('/', (req, res) => {
    res.send('abcd' + req.userId);
});

app.use(middleware);

app.get('/a', (req, res) => {
    res.send('a');
});

app.listen(3000, () => console.log('Server started!'));
