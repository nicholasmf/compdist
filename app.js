﻿
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var vote = require('./routes/vote');
var graphs = require('./routes/graphs');
var user = require('./routes/user.js');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/vote', vote.index);
app.post('/', routes.index);
app.get('/graphs', graphs.index);
app.post('/graphs', graphs.getRatings);
app.get('/user', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
