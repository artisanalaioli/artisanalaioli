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
  'myApp.addItems',
  'ngTouch',
  'angular-carousel.shifty',
  'angular-carousel'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/addfriend', {
      templateUrl: 'add-friend/add-friend.template.html',
      controller: 'AddFriendCtrl'
    })
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthController'
    })
    .when('/split', {
      templateUrl: 'split/split.template.html',
      controller: 'SplitCtrl'
    })
    .when('/bills', {
      templateUrl: 'user-details/bills.html',
      controller: 'BillsController'
    })
    .when('/uploadbill', {
      templateUrl: 'upload-bill/upload-bill.template.html',
      controller: 'UploadBillCtrl'
    })
    .when('/additems', {
      templateUrl: 'add-items/add-items.template.html',
      controller: 'AddItemCtrl'
    })
    .otherwise({redirectTo: '/signin'});
}
])
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
