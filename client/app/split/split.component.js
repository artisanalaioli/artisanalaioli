'use strict';

angular.module('myApp.split', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/split', {
    templateUrl: 'split/split.template.html',
    controller: 'SplitCtrl'
  });
}])

.controller('SplitCtrl', ['$scope', function($scope) {
    
}
]);