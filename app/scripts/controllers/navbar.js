'use strict';

angular.module('kinvolvedApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    {
      'title': 'About',
      'link': '/learn'
    },
    {
      'title': 'Contact',
      'link': '/contact'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
