'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var UserSchema = new Schema({
  id: String,
  firstName: String,
  LastName: String,
  email: String,
  password: String,
  school: Schema.ObjectId,
  phone: String
});

mongoose.model('User', UserSchema);
