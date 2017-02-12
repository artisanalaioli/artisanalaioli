'use strict';

angular.module('myApp.uploadbill', [])

.controller('UploadBillCtrl', function ($scope, Bill) {
  // $scope.image = "";
  $scope.readyToSplit = true;
  
  // $scope.taxRate = 0;
  // $scope.tipRate = 0; // this 'rate' is percentage 

  $scope.addbillinfo = function() {
    // calculate tax rate
    $scope.taxRate = $scope.tax / $scope.subtotal;
    // calculate tiprate
    if (!$scope.tipRate) {
      $scope.tipRate = ($scope.tip / $scope.subtotal * 100).toFixed(2);
    } 
    $scope.readyToSplit = true;
  }

  $scope.addBill = function() {
    $scope.anyNaN();
    var bill = {};
    $scope.addbillinfo();
    bill.name = $scope.bill.name;
    bill.items = $scope.items;
    bill.subtotal = parseFloat($scope.subtotal);
    bill.taxRate = $scope.taxRate; 
    bill.tipRate = $scope.tipRate / 100; // convert percentage to decimal
    bill.tip = $scope.tip;
    bill.tax = $scope.tax;
    Bill.addBill(bill);
  }

  $scope.$watch('displayTax', function() {
    $scope.anyNaN();
    $scope.findTotal();
  })

  $scope.$watch('displayTip', function() {
    $scope.anyNaN();
    $scope.findTotal();
  })

  $scope.updateTips = function(type) {
    if (type === 'rate') {
      $scope.displayTip = parseFloat(($scope.displayTipRate * $scope.subtotal / 100).toFixed(2));
    } else {
      $scope.displayTipRate = parseFloat(($scope.displayTip / $scope.subtotal * 100).toFixed(2));
    }
  }

  $scope.anyNaN = function() {
    $scope.tax = parseFloat($scope.displayTax);
    $scope.tipRate = parseFloat($scope.displayTipRate);
    $scope.tip = parseFloat($scope.displayTip);
    
    if (isNaN($scope.displayTax)) {
      $scope.tax = 0;
    }
    if (isNaN($scope.displayTipRate)) {
      $scope.tipRate = 0;
    }
    if (isNaN($scope.displayTip)) {
      $scope.tip = 0;
    }
  }

  $scope.findTotal = function() {
    $scope.total = (parseFloat($scope.subtotal) + parseFloat($scope.tax) + parseFloat($scope.tip)).toFixed(2);
  }

  $scope.init = function () {
    $scope.bill = Bill.getBill();
    $scope.subtotal = $scope.bill.subtotal.toFixed(2);
    $scope.items = $scope.bill.items;
    $scope.displayTax = $scope.bill.tax;
    $scope.displayTip = $scope.bill.tip;
    $scope.displayTipRate = $scope.bill.tipRate * 100;
    $scope.anyNaN();
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

