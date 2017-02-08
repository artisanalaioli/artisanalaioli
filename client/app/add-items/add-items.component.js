'use strict';

angular.module('myApp.addItems', ['ngRoute'])

.controller('AddItemCtrl', function ($scope, Bill) {
  // $scope.image = "";
  $scope.readyToSplit = true; // need this to be true to proceed
  $scope.price; // price for single item



  $scope.additeminfo = function() {
    $scope.count += 1;
    $scope.price = Number.parseFloat($scope.price);
    $scope.items.push([$scope.count, $scope.item, $scope.price, '']);
    $scope.item = "";
    $scope.price = 0;
    Bill.pushItems = $scope.items;

  }

  $scope.removeitem = function(singleitem) {
    var index = $scope.items.indexOf(singleitem);
    $scope.items.splice(index, 1);
    $scope.count -= 1;
    for (var i = 0; i < $scope.items.length; i++) {
      $scope.items[i][0] = i + 1;
    }
  }



  // $scope.removeimg = function() {
  //  $scope.image = "";
  // }
  // $scope.process = function() {
  // }


  $scope.init = function() {
    $scope.items = Bill.getItems(); // items is an array of [id, item, price, people]
    $scope.count = $scope.items.length;
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


// .directive('myUpload', [function () {
//  return {
//    restrict: 'A',
//    link: function ($scope, elem, attrs) {
//    var reader = new FileReader();
//    reader.onload = function (e) {
//      $scope.image = e.target.result;
//      $scope.$apply();
//    }

//    elem.on('change', function() {
//      reader.readAsDataURL(elem[0].files[0]);
//    });
//  }
//  };
// }]);

