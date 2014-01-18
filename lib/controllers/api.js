'use strict';

var mongoose = require('mongoose'),
    Topic = mongoose.model('Topic'),
    async = require('async');

exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
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
