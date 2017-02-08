'use strict';

angular.module('myApp.uploadbill', ['ngRoute'])

.controller('UploadBillCtrl', function ($scope, Bill) {
  // $scope.image = "";
  $scope.readyToSplit = true;
  
  // $scope.taxRate = 0;
  // $scope.tipRate = 0; // this 'rate' is percentage 

  $scope.addbillinfo = function() {
    // calculate tax rate
    if ($scope.tax) {
      $scope.tax = Number.parseFloat($scope.tax);
      $scope.taxRate = $scope.tax / $scope.subtotal;
    }
    // calculate tiprate
    if (!$scope.tipRate) {
      $scope.tipRate = ($scope.tip / $scope.subtotal * 100).toFixed(2);
    } 
    $scope.readyToSplit = true;
  }

  $scope.addBill = function() {
    var bill = {};
    $scope.addbillinfo();
    bill.name = $scope.name;
    bill.items = $scope.items;
    bill.subtotal = $scope.subtotal;
    bill.taxRate = $scope.taxRate; 
    bill.tipRate = $scope.tipRate / 100; // convert percentage to decimal
    Bill.addBill(bill);
    console.log('tax', $scope.tax);
    console.log('taxRate', $scope.taxRate);
    console.log('Bill', Bill.getBill());
  }

  $scope.init = function () {
    $scope.subtotal = Bill.getSubtotal();
    $scope.items = Bill.getItems();
  }

  $scope.init();

})
.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
});

