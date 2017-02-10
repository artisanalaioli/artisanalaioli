describe('AddItemCtrl', function () {
  console.log('AddItemCtrl Tests');
  var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;

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

    // used to create our AddItemCtrl for testing
    createController = function () {
      return $controller('AddItemCtrl', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Auth: Auth
      });
    };

    createController();
  }));

  afterEach(function () {
    // $httpBackend.verifyNoOutstandingExpectation();
    // $httpBackend.verifyNoOutstandingRequest();

  });

  it('1 to equal 1', function () {
    expect(1).to.equal(1);
  });

  it('should have a init method', function () {
    expect($scope.init).to.be.a('function');
  });

  it('$scope.items should be an empty array', function () {
    expect($scope.items).to.deep.equal([]);
  });

  it('should no initial values in items', function () {
    expect($scope.count).to.equal(0);
  });

  it('should successfully add an item to the list', function () {
    $scope.price = 10;
    $scope.item = 'foody food';
    $scope.additeminfo();
    expect($scope.count).to.equal(1);
  });
  

});

//   it('should have a signup method', function () {
//     expect($scope.signup).to.be.a('function');
//   });

//   it('should store token in localStorage after signup', function () {
//     // create a fake JWT for auth
//     var token = 'sjj232hwjhr3urw90rof';

//     // make a 'fake' reques to the server, not really going to our server
//     $httpBackend.expectPOST('/api/users/signup').respond({token: token});
//     $scope.signup();
//     $httpBackend.flush();
//     expect($window.localStorage.getItem('com.shortly')).to.equal(token);
//   });

//   it('should have a signin method', function () {
//     expect($scope.signin).to.be.a('function');
//   });

//   it('should store token in localStorage after signin', function () {
//     // create a fake JWT for auth
//     var token = 'sjj232hwjhr3urw90rof';
//     $httpBackend.expectPOST('/api/users/signin').respond({token: token});
//     $scope.signin();
//     $httpBackend.flush();
//     expect($window.localStorage.getItem('com.shortly')).to.equal(token);
//   });
// });
