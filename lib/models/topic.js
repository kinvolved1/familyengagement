'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema
var TopicSchema = new Schema({
  id: String,
  title: String,
  creationDate: Date
});

mongoose.model('Topic', TopicSchema);
