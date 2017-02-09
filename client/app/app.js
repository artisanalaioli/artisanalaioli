'use strict';
//
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngFileUpload',
  'myApp.uploadbill',
  'myApp.addfriend',
  'myApp.split',
  'myApp.services',
  'myApp.auth',
  'myApp.bills',
  'myApp.addItems'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

  window.routes = {
    '/signin': {
      templateUrl: 'auth/signin.html',
      controller: 'AuthController',
      allowAnonymous: true
    },
    '/addfriend': {
      templateUrl: 'add-friend/add-friend.template.html',
      controller: 'AddFriendCtrl',
      allowAnonymous: false
    },
    '/signup': {
      templateUrl: 'auth/signup.html',
      controller: 'AuthController',
      allowAnonymous: true
    },
    '/split': {
      templateUrl: 'split/split.template.html',
      controller: 'SplitCtrl',
      allowAnonymous: false
    },
    '/bills': {
      templateUrl: 'user-details/bills.html',
      controller: 'BillsController',
      allowAnonymous: false
    },
    '/uploadbill': {
      templateUrl: 'upload-bill/upload-bill.template.html',
      controller: 'UploadBillCtrl',
      allowAnonymous: false
    },
    '/additems': {
      templateUrl: 'add-items/add-items.template.html',
      controller: 'AddItemCtrl',
      allowAnonymous: false
    }
  };

  for (var path in window.routes) {
    $routeProvider.when(path, window.routes[path]);
  }

  $routeProvider.otherwise({redirectTo: '/signin'});
}])

.run(function($rootScope, $http, $window, Party) {

  $rootScope.clearParty = function() {
    Party.removeAll();
    console.log('Clearing party on New Bill!');
  }

  $rootScope.signout = function() {
    console.log('trying to sign out');
    $http({
      method: 'POST',
      url: '/auth/logout/'
    })
    .then(function(response) {
      console.log('logged out', response);
      $rootScope.signedIn = false;
      $window.location.href = '/#!/signin';
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  }
});
