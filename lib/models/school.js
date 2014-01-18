'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var SchoolSchema = new Schema({
  id: String,
  name: String,
  district: String,
  state: String
});

mongoose.model('School', SchoolSchema);
