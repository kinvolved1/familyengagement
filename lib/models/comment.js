'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var CommentSchema = new Schema({
  id: String,
  content: String,
  creationDate: Date,
  post: Schema.ObjectId
});

mongoose.model('Comment', CommentSchema);
