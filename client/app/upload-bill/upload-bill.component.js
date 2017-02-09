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
    bill.tip = $scope.tip;
    bill.tax = $scope.tax;
    Bill.addBill(bill);
  }

  $scope.$watch('displayTax', function() {
    $scope.anyNan();
    $scope.findTotal();
  })

  $scope.$watch('displayTip', function() {
    $scope.anyNan();
    $scope.findTotal();
  })

  $scope.updateTips = function(type) {
    if (type === 'rate') {
      $scope.displayTip = ($scope.displayTipRate * $scope.subtotal / 100).toFixed(2);
    } else {
      $scope.displayTipRate = ($scope.displayTip / $scope.subtotal * 100).toFixed(2);
    }
  }

  // takes the display value and detects if there are any NaN values
  // $scope.display_ allows the app to display the placeholder values
  $scope.anyNan = function() {
    if (isNaN($scope.displayTax)) {
      $scope.tax = 0;
    } else if ($scope.displayTax) {
      $scope.tax = $scope.displayTax;
    }
    if (isNaN($scope.displayTipRate)) {
      $scope.tipRate = 0;
    } else if ($scope.displayTipRate) {
      $scope.tipRate = $scope.displayTipRate;
    }
    if (isNaN($scope.displayTip)) {
      $scope.tip = 0;
    } else if ($scope.displayTip) {
      $scope.tip = $scope.displayTip;
    }
  }

  $scope.findTotal = function() {
    $scope.total = (parseFloat($scope.subtotal) + parseFloat($scope.tax) + parseFloat($scope.tip)).toFixed(2);
  }

  $scope.init = function () {
    $scope.bill = Bill.getBill();
    $scope.subtotal = $scope.bill.subtotal;
    $scope.items = $scope.bill.items;
    $scope.displayTax = $scope.bill.tax;
    $scope.displayTip = $scope.bill.tip;
    $scope.displayTipRate = $scope.bill.tipRate * 100;
    $scope.total = $scope.subtotal + $scope.tip + $scope.tax;
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

