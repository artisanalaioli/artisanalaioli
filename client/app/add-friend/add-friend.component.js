'use strict';

angular.module('myApp.addfriend', ['ui.bootstrap'])

.controller('AddFriendCtrl',  function($scope, Friends, $rootScope, $http, Party) {
  $scope.friends = []; 
  $scope.party = [];

  ///// NEW INIT FUNCTION

  // $scope.init = function () {
  //   $scope.friends = Friends.getAll();
  // }

  // $scope.init();

  //////

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

  // NEW FUNCTIONALITY - 2.8.17

  $http.get('users').then(function(res) {
      $scope.users = res.data;
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].username === $rootScope.username) {
          $scope.addToParty(res.data[i]);
          console.log('Added current user to party.');
          return;
        }
      }
  });

  var getParty = function() {
    $scope.party = Party.getAll();
    console.log('Current party is now:', $scope.party);
  }

  $scope.addToParty = function(user) {
    Party.addOne(user);
    getParty();
    $scope.partymember = '';
  }

  $scope.removeFromParty = function(name) {
    console.log('Removing', name);
    Party.remove(name);
    getParty();
  }

  $scope.addToPartyManual = function(name, email) {
    Party.addOne({username: name, email: email});
    getParty();
    $scope.emailManual = '';
    $scope.memberManual = '';
  }


});