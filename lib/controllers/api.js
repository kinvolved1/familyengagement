'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Topic = mongoose.model('Topic'),
    Vote = mongoose.model('Vote'),
    Comment = mongoose.model('Comment'),
    async = require('async');

exports.posts = function(req, res) {
  return Post.find(function (err, posts) {
    if (!err) {
      return res.json(posts);
    } else {
      return res.send(err);
    }
  });
};

exports.comments = function(req, res) {
  return Comment.find(function (err, comments) {
    if (!err) {
      return res.json(comments);
    } else {
      return res.send(err);
    }
  });
};

exports.topics = function(req, res) {
  return Topic.find(function (err, topics) {
    if (!err) {
      return res.json(topics);
    } else {
      return res.send(err);
    }
  });
};

exports.votes = function(req, res) {
  return Vote.find(function (err, votes) {
    if (!err) {
      return res.json(votes);
    } else {
      return res.send(err);
    }
  });
};

exports.newPost = function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var category = req.body.category;
    
    var p = new Post();
    p.createdBy = name;
    p.postContents = text;
    p.creationDate = new Date();
    p.save(function (e) {
     res.send();
    });
};

exports.newComment = function(req, res) {
    var content =  req.body.content;
    var postId = req.body.postId;
    
    var c = new Comment();
    c.content =  content;
    c.post = postId;
    c.creationDate = new Date();
    c.save(function (e) {
     res.send('item saved');
    });
};

exports.upVotePost = function(req, res) {
    var postId = req.body.postId;
    var value = 10;

    var v = new Vote();
    v.post = postId;
    v.voteValue = value;
    v.save(function (e) {
     res.send('item saved');
    });
};

exports.upVoteComment = function(req, res) {
    var commentId = req.body.commentId;
    var value = 10;

    var v = new Vote();
    v.comment = commentId;
    v.voteValue = value;
    v.save(function (e) {
     res.send('item saved');
    });
};

exports.postVoteCount = function(req, res) {
    var postId = req.body.postId;
    var voteCount = 5;

    res.send(voteCount);
};
