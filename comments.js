// Create web server with Express
// http://expressjs.com/en/starter/hello-world.html
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./comments.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// Path: /comments
app.get('/comments', (req, res) => res.send(comments));

// Path: /comments/:id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    res.send(comment);
});

// Path: /comments/:id
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(c => c.id === id);
    comments.splice(index, 1);
    res.send({ message: 'Comment deleted' });
});

// Path: /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.send({ message: 'Comment added' });
});

// Path: /comments/:id
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    const index = comments.findIndex(c => c.id === id);
    comments[index] = comment;
    res.send({ message: 'Comment updated' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));