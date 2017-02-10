
angular.module('myApp.addItems', [])

.controller('AddItemCtrl', ['$scope', 'Upload', '$timeout', 'Bill', function ($scope, Upload, $timeout, Bill) {
  // $scope.image = "";
  $scope.readyToSplit = true; // need this to be true to proceed
  $scope.price; // price for single item

  $scope.additeminfo = function() {
    $scope.count += 1;
    $scope.price = Number.parseFloat($scope.price);
    $scope.items.push([$scope.count, $scope.item, $scope.price, []]);
    Bill.pushItems($scope.items);
    $scope.item = "";
    $scope.price = 0;
  }

  $scope.removeitem = function(singleitem) {
    var index = $scope.items.indexOf(singleitem);
    $scope.items.splice(index, 1);
    $scope.count -= 1;
    for (var i = 0; i < $scope.items.length; i++) {
      $scope.items[i][0] = i + 1;
    }
  }

  $scope.calculateSubtotal = function() {
    $scope.subtotal = 0;
    for (var i = 0; i < $scope.items.length; i++) {
      $scope.subtotal += $scope.items[i][2];
    }
    Bill.updateSubtotal($scope.subtotal.toFixed(2));
  }

  $scope.uploadFiles = function(files, errFiles) {
    console.log(files)
    $scope.files = files;
    $scope.errFiles = errFiles;
    angular.forEach(files, function(file) {
      file.upload = Upload.upload({
        url: '/upload',
        data: {file: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          console.log(response);
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * 
         evt.loaded / evt.total));
      });
    });
  }

  $scope.init = function() {
    $scope.items = Bill.getItems(); // items is an array of [id, item, price, people]
    $scope.count = $scope.items.length;
  }

  $scope.init();


}])
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

