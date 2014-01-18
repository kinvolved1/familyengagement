'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var VoteSchema = new Schema({
  id: String,
  post: Schema.ObjectId,
  comment: Schema.ObjectId,
  user: Schema.ObjectId,
  voteValue: Number
});

mongoose.model('Vote', VoteSchema);
