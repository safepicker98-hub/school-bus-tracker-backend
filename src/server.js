const express = require('express');
const app = express();
const client = require('./config/db');


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    res.send('Hello World!');
});

client;

app.listen(3000, () => 
    console.log("Server is starting..."))
