'use strict';

angular.module('kinvolvedApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/new', {
        templateUrl: 'partials/post/new',
        controller: 'NewPostCtrl'
      })
      .when('/posts/category/:category', {
        templateUrl: 'partials/main',
        controller: 'PostListCtrl'
      })
      .when('/post/:postID', {
        templateUrl: 'partials/post/view',
        controller: 'ViewPostCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });