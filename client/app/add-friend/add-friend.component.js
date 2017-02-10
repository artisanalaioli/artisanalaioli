'use strict';

angular.module('myApp.addfriend', ['ui.bootstrap'])

.controller('AddFriendCtrl',  function($scope, $rootScope, $http, Party, Auth) {

  $scope.party = [];

  var init = function() {
    $rootScope.newBill();

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
  }

  init();


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
