angular.module('myApp.bills', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/bills', {
    templateUrl: 'user-details/bills.html',
    controller: 'BillsController'
  });
}])

.controller('BillsController', function ($scope, $http) {
  $scope.bills = [];

  $http({
    method: 'GET',
    url: '/bills'
  })
  .then(function(response) {
    console.log('response: ', response);
    if (response.data.length > 0) {
      $scope.bills = response;
    }

  })
  .catch(function(error) {
    console.log('Error: ', error);
  })
});