'use strict';

angular.module('myApp.split', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/split', {
    templateUrl: 'split/split.template.html',
    controller: 'SplitCtrl'
  });
}])

.controller('SplitCtrl', function($scope, Friends, Bill) {
    $scope.friends = Friends.getAll();
    $scope.bill = Bill.getBill();
    $scope.items = $scope.bill.items;


    $scope.addItemToFriend = function(item, friend) {
        friend.items.push(item); // add item for friend               
        var totalBeforeTip = 0;
        friend.items.forEach(function(item) {
            totalBeforeTip += item[1];
        });
        friend.tip = totalBeforeTip * $scope.bill.tiprate;
        friend.total = totalBeforeTip + friend.tip;
        Friends.getAll();
    }
}
);