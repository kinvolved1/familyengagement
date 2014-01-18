'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var PostSchema = new Schema({
  id: String,
  createdBy: Schema.ObjectId,
  voteCount: Number,
  postContents: String,
  creationDate: Date
});

mongoose.model('Post', PostSchema);
