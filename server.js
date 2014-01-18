'use strict';

// Module dependencies.
var express = require('express'),  
    path = require('path'),
    fs = require('fs');

var app = express();

// Connect to database
var db = require('./lib/db/mongo');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Express Configuration
require('./lib/config/express')(app);

// Controllers
var api = require('./lib/controllers/api'),
    index = require('./lib/controllers');

// Server Routes
app.get('/api/topics', api.awesomeThings);
app.get('/api/posts', api.awesomeThings);
app.get('/api/comments', api.awesomeThings);
app.get('/api/votes', api.awesomeThings);
app.post('/api/newPost', api.newPost);
app.post('/api/newComment', api.newPost);
app.post('/api/upVotePost', api.newPost);
app.post('/api/upVoteComment', api.newPost);

// Angular Routes
app.get('/partials/*', index.partials);
app.get('/*', index.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;