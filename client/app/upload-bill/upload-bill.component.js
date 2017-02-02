'use strict';

angular.module('myApp.uploadbill', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/uploadbill', {
    templateUrl: 'upload-bill/upload-bill.template.html',
    controller: 'UploadBillCtrl'
  });
}])

.controller('UploadBillCtrl', function ($scope, Bill) {
	// $scope.image = "";
	$scope.priceBeforeTip = "";
	$scope.readyToSplit = false;
	$scope.item; // single item
	$scope.price; // price for single item
	$scope.items = []; // items is an array of [item, price]

	$scope.addbillinfo = function() {
		// priceBeforeTip is a float number
		$scope.priceBeforeTip = Number.parseFloat($scope.priceBeforeTip);
		if (!$scope.tiprate) {
			$scope.tiprate = $scope.tipnum / $scope.priceBeforeTip;
		} else {
		// tip rate is a float number
			$scope.tiprate = Number.parseFloat($scope.tiprate);
		}
		$scope.readyToSplit = true;
	}

	$scope.additeminfo = function() {
		$scope.price = Number.parseFloat($scope.price);
		$scope.items.push([$scope.item, $scope.price]);
		$scope.item = "";
		$scope.price = "";
	}

	$scope.addBill = function() {
		var bill = {};
		bill.name = $scope.name;
		bill.items = $scope.items;
		bill.priceBeforeTip = $scope.priceBeforeTip;
		bill.tiprate = $scope.tiprate;
		Bill.addBill(bill);
	}

	// $scope.removeimg = function() {
	// 	$scope.image = "";
	// }
	// $scope.process = function() {
	// }

})

// .directive('myUpload', [function () {
// 	return {
// 		restrict: 'A',
// 		link: function ($scope, elem, attrs) {
// 		var reader = new FileReader();
// 		reader.onload = function (e) {
// 			$scope.image = e.target.result;
// 			$scope.$apply();
// 		}

// 		elem.on('change', function() {
// 			reader.readAsDataURL(elem[0].files[0]);
// 		});
// 	}
// 	};
// }]);

