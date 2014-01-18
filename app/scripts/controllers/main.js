'use strict';

angular.module('kinvolvedApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/topics').success(function(topics) {
      $scope.topics = topics;
    });
  });
