'use strict';

var Kinvolved = angular.module('kinvolvedApp' );
  Kinvolved.controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/posts').success(function(posts) {
      $scope.posts = posts;
    });
  }).controller('NewPostCtrl', function ($scope, $http) {
    $scope.formData = {};
    // process the form
    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : '/api/newPost',
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            if (!data.success) {
            } else {
            }
        });
    };
  });

