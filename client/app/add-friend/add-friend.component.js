'use strict';

angular.module('myApp.addfriend', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addfriend', {
    templateUrl: 'add-friend/add-friend.template.html',
    controller: 'AddFriendCtrl'
  });
}])

.controller('AddFriendCtrl',  function($scope, Friends) {
    $scope.friends = [];

    $scope.addOne = function(friendname) {
    	Friends.addOne(friendname);
    	$scope.getAll();
    }

    $scope.getAll = function() {
    	Friends.getAll().then(function(friends) {
    		$scope.friends = friends;
    	});
    }

    $scope.removeOne = function(friend) {
    	Friends.removeOne(friend);
    	$scope.getAll();
    }
}
);