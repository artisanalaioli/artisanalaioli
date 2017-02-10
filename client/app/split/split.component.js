'use strict';

angular.module('myApp.split', [])


.controller('SplitCtrl', function($scope, Bill, $rootScope, Party) {
  $scope.friends = Party.getAll();
  $scope.bill = Bill.getBill();
  $scope.assigneditems = [];
  $scope.items = $scope.bill.items;
  /******************************************/
  /* THIS IS STRUCTURE OF bill, item, friend
  /* bill: {name: string, items:[], subtotal: number, taxRate: number, tipRate: number}
  /* item: [id, itemname, price, people.name];
  /* friend: {name: string, items: []}
  /*****************************************/ 

  $scope.getAllFriendName = function() {
    var array = [];
    $scope.friends.forEach(function(friend) {
      array.push(friend.name);
      console.log('Adding friend name:', friend.name);
    });
    return array;
  }

  $scope.isSelected = [];
  $scope.friendNames = $scope.getAllFriendName();
  /**
  * This function calculate the grand total price for a single friend. Grand total
  * includes total price, tax and tip.
  * @param {object} input a friend object
  */
  $scope.grandTotal = function(friend) {
    var totalBeforeTip = 0;
    friend.items.forEach(function(singleitem) {
      totalBeforeTip += singleitem[2];
    });
    friend.tip = Number.parseFloat((totalBeforeTip * $scope.bill.tipRate).toFixed(2));
    friend.tax = Number.parseFloat((totalBeforeTip * $scope.bill.taxRate).toFixed(2));
    friend.total = Number.parseFloat((totalBeforeTip + friend.tip + friend.tax).toFixed(2));
    Party.getAll();        
  }

  /**
  * This function assign an item to a friend, add this item to $scope.assignedItems,
  * and update the grand total for this friend
  * @params {array} item, {object} friend
  */
  $scope.assign = function(item, friend) {
    item[3] = friend.name; 
    friend.items.push(item); // add item for friend               
    $scope.assigneditems.push(item); // add item into assigneditems list
    $scope.grandTotal(friend); 
  }

  /**
  * This function unassign an item from a friend, remove this item from $scope.assignedItems,
  * and update the total grand for this friend.
  * @params {array} item to be unassigned, {object} friend
  */
  $scope.unassign = function(item, friend) {
    var indexforFriend = friend.items.indexOf(item);
    friend.items.splice(indexforFriend, 1);
    var indexForAllAssigned = $scope.assigneditems.indexOf(item);
    $scope.assigneditems.splice(indexForAllAssigned, 1); // remove item from assigneditems list
    item[3] = "";
    $scope.grandTotal(friend);
  }

  /**
   * This function check if this item is already been assigned. 
   * If this item is not assigned, it will call 'assign function'.
   * If this item is assigned to the same person, it will unassign from this person.
   * If this item is assigned to a different person, it will unassign the item from
   * the origin person, and assign the item to the new person.
   * @param {array} input an item object, {object} input a friend object.
   */
  $scope.checkAssign = function(item, friend, id) {
    var needReassign = false;
    $scope.friendSelected =[];

    for (var i = 0; i < $scope.assigneditems.length; i++) {
      if ($scope.assigneditems[i][0] === item[0]) {
        needReassign = true;
          // if the item belongs to the 'friend'
        if ($scope.assigneditems[i][3] === friend.name) { 
          // unassign this item from 'friend's item list
          $scope.unassign(item, friend);
          $scope.isSelected[id]='';

                    
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
          $scope.isSelected[id]='selected'

        }
        break;
      }
    }

    if (!needReassign) {
     // $scope.isSelected[id] = $scope.isSelected[id]=='selected'?'':'selected';
      $scope.isSelected[id]='selected';
      $scope.assign(item, friend);            
    }

  }

  $scope.selectFriend = function(id) {
    $scope.friendSelected[id] = $scope.friendSelected[id]=='selected'?'':'selected'
  }  

  /**
  * This function is sending a post request to server
  * 
  */
  $scope.submitFinalBill = function() {
    // console.log('she gave me a straight up grape soda')
    var finalBill = {
      restaurant: $scope.bill.name,
      total: $scope.bill.subtotal * (1 + $scope.bill.tipRate + $scope.bill.taxRate),
      people: $scope.friendNames,
      info: $scope.friends,
      date: new Date(),
      owner: $rootScope.username
    }
    console.log('Setting date on bill:', finalBill.date);
    Bill.clearAllBill();
    Party.removeAll();
    Bill.submitSplit(finalBill);
  }

  $scope.init = function() {
    $scope.subtotal = Bill.getSubtotal();
    $scope.bill = Bill.getBill();
  }

  $scope.init();
});