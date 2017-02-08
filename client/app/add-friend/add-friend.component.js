'use strict';

angular.module('myApp.addfriend', ['ngRoute'])

.controller('AddFriendCtrl',  function($scope, Friends) {
  $scope.friends = []; 

  $scope.addOne = function(friendname) {
  	Friends.addOne(friendname); 
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