'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.login', []);
// Clear browser cache (in development mode)
app.controller('LoginController', function ($scope, $rootScope, AuthService,$location) {
  $scope.credenciales = {
    username: '',
    password: ''
  };
  $scope.login = function (credenciales) {
    AuthService.login(credenciales).then(function (user) {
      $scope.setCurrentUser(user);
      $location.path('/');
    }, function () {
    });
  };
})