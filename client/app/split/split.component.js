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
    $scope.assigneditems = [];
    $scope.items = $scope.bill.items;

    /******************************************/
    // item: [id, itemname, price, people.name];
    // friend: {name: string, items: []}
    /*****************************************/ 

    $scope.grandTotal = function(friend) {
        var totalBeforeTip = 0;
        friend.items.forEach(function(singleitem) {
            totalBeforeTip += singleitem[2];
        });
        friend.tip = totalBeforeTip * $scope.bill.tiprate;
        friend.total = totalBeforeTip + friend.tip;
        Friends.getAll();        
    }

    $scope.assign = function(item, friend) {
        item[3] = friend.name; 
        friend.items.push(item); // add item for friend               
        $scope.assigneditems.push(item); // add item into assigneditems list
        // Friends.getAll();   
        $scope.grandTotal(friend); 
    }

    $scope.unassign = function(item, friend) {
        var indexforFriend = friend.items.indexOf(item);
        friend.items.splice(indexforFriend, 1);
        var indexForAllAssigned = $scope.assigneditems.indexOf(item);
        $scope.assigneditems.splice(indexForAllAssigned, 1); // remove item from assigneditems list
        item[3] = "";
        // Friends.getAll();   
        $scope.grandTotal(friend);
    }

    // check if this item is already been assigned
    $scope.checkAssign = function(item, friend) {
        var needReassign = false;

        for (var i = 0; i < $scope.assigneditems.length; i++) {
            if ($scope.assigneditems[i][0] === item[0]) {
                needReassign = true;
                // if the item belongs to the 'friend'
                if ($scope.assigneditems[i][3] === friend.name) { 
                    // unassign this item from 'friend's item list
                    $scope.unassign(item, friend);
                    
                } else { // if the item belongs to another friend
                    // find the ANOTHER friend by friend.name
                    var anotherFriend;
                    $scope.friends.forEach(function(singlefriend) {
                        if (singlefriend.name === item[3]) {
                            anotherFriend = singlefriend;
                        }
                    })
                    console.log('another friend', anotherFriend.name);
                    $scope.unassign(item, anotherFriend); // unassign this item from the ANOTHER friend
                    $scope.assign(item, friend); // assign this item to THIS friend
                }
                break;
            }
        }

        if (!needReassign) {
            $scope.assign(item, friend);            
        }

    }
}
);