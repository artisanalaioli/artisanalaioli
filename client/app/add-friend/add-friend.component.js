'use strict';

angular.module('myApp.addfriend', ['ui.bootstrap'])

.controller('AddFriendCtrl',  function($scope, Friends, $rootScope, $http) {
  $scope.friends = []; 

  $scope.addOne = function(user) {
    var yourName = $rootScope.username;
    console.log(user.username);
    Friends.addOne(user.username, yourName); 
  	$scope.getAll();
  	$scope.friendname = "";
  }

  $scope.getAll = function() {   	
  	$scope.friends = Friends.getAll();
  }

  $scope.removeOne = function(friend) {
  	Friends.removeOne(friend);
  	$scope.getAll();
  }

  $http.get('users').then(function(res) {
      $scope.users = res.data;
      console.log(res.data);
  });

});