const http = require('http');
const express = require('express');
const app = express();
const config = require('./config');

process.env.NODE_ENV = "development";

app.get('/', function(req, res) {
    res.send('Great ! It works.');
  });

app.listen(config.app.port, 'localhost', function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", config.app.port);
})

console.log(config.app.name);