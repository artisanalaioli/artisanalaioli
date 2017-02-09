angular.module('myApp.auth', [])

.controller('AuthController', function ($scope, Auth) {
  $scope.user = {};


  $scope.signin = function () {
    Auth.signin($scope.user.username, $scope.user.password);

    $scope.user.username = '';
    $scope.user.password = '';

  };


  $scope.signup = function () {
    Auth.signup($scope.user.username, $scope.user.email, $scope.user.password);

    $scope.user.username = '';
    $scope.user.email = '';
    $scope.user.password = '';

  };

});
