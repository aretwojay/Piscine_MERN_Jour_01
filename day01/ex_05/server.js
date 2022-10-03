const http = require('http');
const express = require('express');
const app = express();
const config = require('./config');
const { resolve } = require('path');

process.env.NODE_ENV = "development";

app.get('/name/:name?', function (req, res) {
    let name = req.params.name;
    let age = "you have " + req.query.age + " yo";
    if (name === undefined) {
        name = "unknown";
    }
    if (req.query.age === undefined) {
        age = "i dont know your age";
    }

    res.type('html');
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello `+ name + `, ` + age + `</h1>
</body>
</html>`);
    res.end();
});

app.listen(config.app.port, config.app.ip, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", config.app.port);
});