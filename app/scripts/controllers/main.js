'use strict';

var Kinvolved = angular.module('kinvolvedApp' );
  Kinvolved.controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/posts').success(function(posts) {
      $scope.posts = posts;
    });
  }).controller('PostListCtrl', function ($scope, $routeParams, $http) {
    $http.get('/api/posts/' + $routeParams.category ).success(function(posts) {
      $scope.posts = posts;
    });
  }).controller('NewPostCtrl', function ($scope, $http, $location) {
    $scope.formData = {};
    $scope.categories = [
     { name: 'Student Interest in School', selected:'false' },
     { name: 'Empowering Families', selected:'false' },
     { name: 'Homework Help', selected:'false' },
     { name: 'Parent Conferences', selected:'false' }
    ];

    // watch Categories for changes
     $scope.$watch('categories|filter:{selected:true}', function (nv) {
       $scope.formData.categories = nv.map(function (cat) {
         return cat.name;
       });
     }, true);

    // process the form
    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : '/api/newPost',
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            // TODO: Show confirmation, Errors
            $location.path('/post/' + data._id);
            $scope.$apply();
        });
    };
  }).controller('ViewPostCtrl', function ($scope, $routeParams, $http) {
    $scope.formData = {
      post: $routeParams.postID
    };
    $http.get('/api/post/'+ $routeParams.postID ).success(function(post) {
      $scope.post = post;
      $http.get('/api/post/'+ $routeParams.postID + '/comments' ).success(function(comments) {
        $scope.comments = comments;
      });
    });
    // process the form
    $scope.processForm = function() {
      $http({
        method  : 'POST',
        url     : '/api/newComment',
        data    : $.param($scope.formData),  // pass in data as strings
        dataType: 'json',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
        // TODO: Show confirmation, Errors
        $scope.comments.push(data);
      });
    };
    $scope.upVote = function() {
      $http({
        method  : 'POST',
        url     : '/api/upVotePost',
        data    : $.param($scope.formData),  // pass in data as strings
        dataType: 'json',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
        // TODO: Show confirmation, Errors
        $scope.post.voteCount = data[0].score
      });
    }
    $scope.downVote = function() {
      $http({
        method  : 'POST',
        url     : '/api/downVotePost',
        data    : $.param($scope.formData),  // pass in data as strings
        dataType: 'json',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
        // TODO: Show confirmation, Errors
        $scope.post.voteCount = data[0].score
      });
    }
  }).controller('TopicNavCtrl', function ($scope, $routeParams, $http) {
      $http({
        method  : 'GET',
        url     : '/api/topics',
        dataType: 'json',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
        // TODO: Show confirmation, Errors
        $scope.topics = data;
      });
  }).controller('UserLoginCtrl', function ($scope, $routeParams, $http) {
      //$http({
      //  method  : 'GET',
      //  url     : '/api/topics',
      //  dataType: 'json',
      //  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      //})
      //.success(function(data) {
      //  // TODO: Show confirmation, Errors
      //  $scope.topics = data;
      //});
  }).controller('UserRegisterCtrl', function ($scope, $routeParams, $http) {
    // process the form
    $scope.formData = {};
    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : '/api/user/new',
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            // TODO: Show confirmation, Errors
            // $location.path('/post/' + data._id);
            $scope.$apply();
        });
    };
  }).controller('ContactCtrl', function ($scope, $routeParams, $http) {
    // process the form
    $scope.formData = {};
    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : '/api/feedback/new',
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            // TODO: Show confirmation, Errors
            // $location.path('/post/' + data._id);
            $scope.$apply();
        });
    };
  });
