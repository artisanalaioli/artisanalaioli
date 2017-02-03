angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/signin', {
    templateUrl: 'auth/signin.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: 'auth/signup.html',
    controller: 'AuthController'
  });
}])

.controller('AuthController', function ($scope, $http) {
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
      console.log(response);
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
      console.log(response);
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  };
});