const http = require('http');
const express = require('express');
const app = express();
const config = require('./config');
const {resolve} = require('path');

process.env.NODE_ENV = "development";

app.get('/name/:name', function(req, res) {
    res.type('html');
    res.send('index');
  });

app.listen(config.app.port, config.app.ip, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", config.app.port);
})

console.log(config.app.name);