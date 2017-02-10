describe('SplitCtrl', function () {
  console.log('SplitCtrl Tests');
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
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    // $window.localStorage.removeItem('com.shortly');
  });

  it('1 to equal 1', function () {
    expect(1).to.equal(1);
  });
  

});