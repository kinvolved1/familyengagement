'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var CategorySchema = new Schema({
  id: String,
  text: String,
  postCount: Number
});

mongoose.model('Category', CategorySchema);
