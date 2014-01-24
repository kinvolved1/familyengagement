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

// Once we get users done this unique index should be added to ensure one vote.
// VoteSchema.index({ post: -1, user: -1 }, { unique: true });

mongoose.model('Vote', VoteSchema);
