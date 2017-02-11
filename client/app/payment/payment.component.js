'use strict';

angular.module('myApp.payment', [])

.controller('PaymentCtrl', function($scope, Bill, Users, $rootScope) {

  $scope.selectedUser = null;

  // on initialize, populates all users from DB into $scope.users for typeahead
  var init = function() {
    Users.getAll(function(res) {
        $scope.users = res.data;

        for (var i = 0; i < $scope.users.length; i++) {
          if ($scope.users[i].username === $rootScope.username) {
            $scope.users.splice(i, 1);
            console.log('Removed current user from available search options.');
            return;
          }
        }
    });

  };

  init();

  $scope.selectUser = function(username) {
    $scope.selectedUser = username;
    console.log($scope.selectedUser);
    $scope.userToPay = '';
  };


});