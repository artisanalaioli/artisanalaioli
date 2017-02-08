'use strict';

angular.module('myApp.addfriend', ['ngRoute'])

.controller('AddFriendCtrl',  function($scope, Friends, $rootScope) {
  $scope.friends = []; 

  $scope.addOne = function(friendname) {
    var yourName = $rootScope.username;
    Friends.addOne(friendname, yourName); 
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
}
);