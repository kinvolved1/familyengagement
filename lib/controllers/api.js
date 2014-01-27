'use strict';

var mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
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

    console.log(post);
    //db.votes.aggregate([{$match:{post:ObjectId('52dfe42b4da0b9af20000001')}},{$group:{_id:'$post',score:{$sum:'$voteValue'}} }]);
    v.save(function (e) {
      Vote.aggregate([
        { $match : {
          post: new ObjectId(post)
        }},{ $group:{
            _id: '$post',
            score: {
              $sum: '$voteValue'
            }
        }}], function (err, results) {
          if (err) {
              res.json(err);
          } else {
            Post.update(
              {_id:new ObjectId(post)},
              {$inc: {voteCount:1}},
              {}, function(){}
            );
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
        { $match : {
          post: new ObjectId(post)
        }},{ $group:{
            _id: '$post',
            score: {
              $sum: '$voteValue'
            }
        }}], function (err, results) {
          if (err) {
            console.error(err);
          } else {
            Post.update(
              {_id:new ObjectId(post)},
              {$inc: {voteCount:-1}},
              {},
              function(){}
            );
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

exports.newUser = function(req, res) {
    var category = req.body.category;
    var p = new User();
    p.firstName = req.body.firstName;
    p.lastName = req.body.lastName;
    p.username = req.body.username;
    p.email = req.body.email;
    p.password = req.body.password;
    p.creationDate = new Date();

    p.save(function (e) {
     res.json(p);
    });
};

exports.feedback = function(req, res){
  var mailer = req.app.get('mailer')();
  mailer.mail({
      from: req.app.get('noreplyEmail'),
      replyTo: req.body.fromName + " <" + req.body.fromEmail + ">",
      to: req.app.get('adminEmail'),
      subject: "Contact Form Submission",
      text: req.body.fromMessage,
      html: req.body.fromMessage
  });
  res.json({success:true});
}
