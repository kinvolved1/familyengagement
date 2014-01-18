'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var TagSchema = new Schema({
  id: String,
  post: Schema.ObjectId,
  text: String
});

mongoose.model('Tag', TagSchema);
