angular.module('myApp.bills', [])

.controller('BillsController', function ($scope, $rootScope, $http) {
  $scope.bills = [];
  $scope.retrieved = false;

  $http({
    method: 'GET',
    url: '/bills'
  })
  .then(function(response) {
    console.log('response: ', response);
    if (Array.isArray(response.data)) {
      $scope.bills = response.data;
      $scope.retrieved = true;
    }

  })
  .catch(function(error) {
    console.log('Error: ', error);
  })
});