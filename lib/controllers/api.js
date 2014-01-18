'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Topic = mongoose.model('Topic'),
    async = require('async');

exports.awesomeThings = function(req, res) {
  return Post.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.newPost = function(req, res) {
	//console.log(req.body);
    //return res.json(req.body);
    var name = req.body.name;
    var text = req.body.text;
    var category = req.body.category;
    
    var p = new Post();
    p.createdBy = name;
    p.postContents = text;
    p.creationDate = new Date();
    p.save(function (e) {
   	 res.send('item saved');
  	});

}
exports.topics = function(req, res) {
  return Topic.find(function (err, topics) {
    if (!err) {
      return res.json(topics);
    } else {
      return res.send(err);
    }
  });
};
