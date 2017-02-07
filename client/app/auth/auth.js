angular.module('myApp.auth', ['ngRoute'])

.controller('AuthController', function ($scope, $http, $rootScope, $window) {
  $scope.user = {};


  $scope.signin = function () {
    $http({
      method: 'POST',
      url: '/auth/login',
      data: {
        username: $scope.user.username,
        password: $scope.user.password
      }
    })
    .then(function(response) {
      $scope.user.username = '';
      $scope.user.password = '';
      $rootScope.signedIn = true;
      $window.location.href = '/#!/uploadbill';
      console.log('login', response);
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  };

  $scope.signup = function () {
    $http({
      method: 'POST',
      url: '/auth/register',
      data: {
        username: $scope.user.username,
        email: $scope.user.email,
        password: $scope.user.password
      }
    })
    .then(function(response) {
      $scope.user.username = '';
      $scope.user.email = '';
      $scope.user.password = '';
      $rootScope.signedIn = true;
      $window.location.href = '/#!/uploadbill';
      console.log('signed up', response);
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  };
});
