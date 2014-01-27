'use strict';

var nodemailer = require("nodemailer"),
    fs = require('fs'),
    _ = require('underscore');

if( process.env.CONFIG )
  var config = require( process.env.CONFIG );

module.exports = _.extend({
  mongo : {
  },
  mailer : function() {
    return nodemailer;
  },
  noreplyEmail: '',
  adminEmail: ''
}, config || {} );