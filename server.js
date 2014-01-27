'use strict';

// Module dependencies.
var express = require('express'),  
    path = require('path'),
    _ = require('underscore'),
    fs = require('fs'),
    config = require('./lib/config/config.js'),
    db = require('./lib/db/mongo')(config.mongo);

var app = express();

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Express Configuration
require('./lib/config/express')(app,config);

// Controllers
var api = require('./lib/controllers/api'),
    index = require('./lib/controllers');

// Server Routes
app.get('/api/topics', api.topics);
app.get('/api/posts', api.posts);
app.get('/api/posts/:category', api.postsByCategory);
app.get('/api/post/:id', api.post);
app.get('/api/post/:id/comments', api.postComments);
app.get('/api/comments', api.comments);
app.get('/api/votes', api.votes);
app.get('/api/users/new', api.newUser);
app.post('/api/newPost', api.newPost);
app.post('/api/feedback/new', api.feedback);
app.post('/api/newComment', api.newComment);
app.post('/api/upVotePost', api.upVotePost);
app.post('/api/downVotePost', api.downVotePost);
app.post('/api/upVoteComment', api.upVoteComment);

// Angular Routes
app.get('/partials/*', index.partials);
app.get('/*', index.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
module.exports = app;