const http = require('http');
const express = require('express');
const app = express();
const config = require('./config');
const {resolve} = require('path');
const fs = require('fs');

process.env.NODE_ENV = "development";

exports.create = function (name) {
    fs.appendFile(resolve(name), '', function (err) {
        if (err) {
            return console.log('Create "' + name +'" : KO');
        }
        console.log('Create "' + name +'" : OK');
    });
};

exports.read = function (name) {
    fs.readFile(resolve(name), {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return console.log('Read "' + name +'" : KO');
        }
        console.log(data);
    });
};

exports.update = function (name, content) {
    fs.writeFile(resolve(name), content,{encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return console.log('Update "' + name +'" : KO');
        }
        console.log('Update "' + name +'" : OK');
    });
};

exports.delete = function (name) {
    fs.unlink(resolve(name), function(err){
        if (err){
            return console.log('Delete "' + name +'" : KO');
        } 
        console.log('Delete "' + name +'" : OK');
   });  
};

const methodOverride = require("method-override");
app.use(methodOverride('_method'));


app.get('/', function(req, res) {
    res.sendFile(resolve("index.html"));
});

app.get('/files/:name?', function(req, res) {
    let name;
    req.params.name !== undefined ? 
    name = req.params.name : name = "unknown";
    exports.read(name);
    res.send("GET : " + name);
});

app.post('/files/:name?', function(req, res) {
    let name;
    req.params.name !== undefined ? 
    name = req.params.name : name = "";
    exports.create(name);
    res.send("POST : " + name);
});

app.put('/files/:name?/:content?', function(req, res) {
    let name, content;
    req.params.name !== undefined ? 
    name = req.params.name : name = "";

    req.params.content !== undefined ? 
    content = req.params.content : content = "";
    exports.update(name, content);
    res.send("PUT : " + name + " | " + content);
});

app.delete('/files/:name?', function(req, res) {
    let name;
    req.params.name !== undefined ? 
    name = req.params.name : name = "";
    exports.delete(name);
    res.send("DELETE : " + name);
});

app.listen(config.app.port, config.app.ip, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", config.app.port);
});