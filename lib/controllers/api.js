'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Topic = mongoose.model('Topic'),
    Vote = mongoose.model('Vote'),
    Comment = mongoose.model('Comment'),
    async = require('async');

exports.posts = function(req, res) {
  return Post.find().sort({voteCount:-1}).limit(20).exec(
    function (err, posts) {
        if (!err) {
          return res.json(posts);
        } else {
          return res.send(err);
        }
      }
  );
};

exports.postsByCategory = function(req, res) {
  return Post.find({categories:req.params.category}).sort({voteCount:-1}).limit(20).exec(function (err, posts) {
    if (!err) {
      return res.json(posts);
    } else {
      return res.send(err);
    }
  });
};

exports.post = function(req, res) {
  return Post.findById(req.params.id, function (err, post) {
    if (!err) {
      Vote.aggregate([
        { $group: {
            _id: '$post',
            score: { $sum: '$voteValue'}
        }}
        ], function (err, results) {
          if (err) {
            return err;
          } else {
            post.score = 11;//results.score;
            return res.json(post);
          }
        }
      );
    } else {
      return res.send(err);
    }
    return false;
  });
};

exports.postComments = function(req, res) {
  return Comment.find({post:req.params.id}, function (err, comments) {
    if (!err) {
      return res.json(comments);
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
    var category = req.body.category;
    var p = new Post();
    p.title = req.body.title;
    p.categories = req.body.categories;
    p.createdBy = req.body.name;
    p.postContents = req.body.text;
    p.creationDate = new Date();
    

  //createdBy: Schema.ObjectId,
  //createdBy: String,
  //title: String,
  //content: String,
  //voteCount: Number,
  //postContents: String,
  //creationDate: Date

    p.save(function (e) {
     res.json(p);
    });
};

exports.newComment = function(req, res) {
    var content =  req.body.content;
    var post = req.body.post;
    
    var c = new Comment();
    c.content =  content;
    c.post = post;
    c.creationDate = new Date();
    c.save(function (e) {
     res.json(c);
    });
};

exports.upVotePost = function(req, res) {
    var post = req.body.post;

    var v = new Vote();
    v.post = post;
    v.voteValue = 1;

    v.save(function (e) {
      Vote.aggregate([
        { $group: {
            _id: '$post',
            score: { $sum: '$voteValue'}
        }}
        ], function (err, results) {
          if (err) {
              console.error(err);
          } else {
            Post.update({_id:post},{$inc: {voteCount:1}}, {}, function(i,e){
              console.log(post,i,e);
            });
            res.json(results);
          }
        }
      );
    });
};
exports.downVotePost = function(req, res) {
    var post = req.body.post;

    var v = new Vote();
    v.post = post;
    v.voteValue = -1;
    v.save(function (e ){
      Vote.aggregate([
        { $group: {
            _id: '$post',
            score: { $sum: '$voteValue'}
        }}
        ], function (err, results) {
          if (err) {
            console.error(err);
          } else {
            Post.update({_id:post},{$inc: {voteCount:-1}}, {},function(i,e){
              console.log(i,e);
            });
            res.json(results);
          }
        }
      );
    });
};

exports.upVoteComment = function(req, res) {
    var commentId = req.body.commentId;
    var value = 10;

    var v = new Vote();
    v.comment = commentId;
    v.voteValue = value;
    v.save(function (e) {
     res.json(v);
    });
};

exports.postVoteCount = function(req, res) {
    var postId = req.body.postId;
    var voteCount = 5;

    res.json({votes:voteCount});
};
