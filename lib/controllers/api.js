'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Post = mongoose.model('Post'),
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