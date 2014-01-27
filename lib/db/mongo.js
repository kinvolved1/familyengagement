'use strict';

var mongoose = require('mongoose'),
    _ = require('underscore');

module.exports = function(config){
  exports.mongoose = mongoose;
  console.log(config);
  
  config = _.extend({
    uristring: 'mongodb://localhost/test',
    mongoOptions: { db: { safe: true } },
    onConnect: function (err, res) {
      if (err) {
        console.log ('ERROR connecting to: ' + config.uristring + '. ' + err);
      } else {
        console.log ('Successfully connected to: ' + config.uristring);
      }
    }
  }, config || {} );

  // Connect to Database
  mongoose.connect(config.uristring, config.mongoOptions, config.onConnect);
}
