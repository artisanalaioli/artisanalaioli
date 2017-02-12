describe('SplitCtrl', function () {
  console.log('SplitCtrl Tests');
  var $rootScope, $location, $window, $httpBackend, createController, Auth;
  var $scope = {};

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('myApp'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    Bill = $injector.get('Bill');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our SplitCtrl for testing
    createController = function () {
      return $controller('SplitCtrl', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Auth: Auth
      });
    };

    createController();

    $scope.items = [
      [1, 'pizza', 10, []],
      [2, 'beer', 16, []],
      [3, 'rice', 13, []],
      [4, 'potato', 12, []]
    ]

    $scope.friends = [
      {name: 'Pat', email: 'email', items: [], cost: {}, total: 0},
      {name: 'Frank', email: 'email', items: [], cost: {}, total: 0},
      {name: 'Greg', email: 'email', items: [], cost: {}, total: 0},
      {name: 'James', email: 'email', items: [], cost: {}, total: 0}
    ]

    $scope.bill = {
      items: $scope.items,

      name: 'Restaurant Name',
      subtotal: '51',
      tax: '5',
      taxRate: 0.098,
      tip: '7.65',
      tipRate: 0.15
    }

  }));

  afterEach(function () {


  });
  
  it('bill contains all items', function() {
    expect($scope.bill.items).to.deep.equal($scope.items);
  });

  it('friends list should contain 4 friends', function () {
    expect($scope.friends.length).to.equal(4);
  });


});





