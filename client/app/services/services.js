angular.module('myApp.services',[])
  
  .factory('Bill', function($http) {
    var mybill = {}; 
    mybill.name;
    mybill.items; // an array of [itemName, price, people]
    mybill.priceBeforeTip;
    mybill.tipRate;
    mybill.taxRate;

    var allItems = [];

    var subtotal = 0;

    var getItems = function() {
      return allItems;
    }

    var pushItems = function(items) {
      allItems = items;
    }

    var getSubtotal = function() {
      return subtotal;
    }

    var updateSubtotal = function(newSub) {
      subtotal = newSub;
    }

   var addBill = function(bill) {
      mybill.name = bill.name;
      mybill.items = bill.items; // an array of [itemName, price, people]
      mybill.subtotal = bill.subtotal;
      mybill.tipRate = bill.tipRate;  
      mybill.taxRate = bill.taxRate;    
    }

    var removeBill = function() {
      mybill = {}; 
    }

    var getBill = function() {
      return mybill;
    }

    var getName = function() {
      return mybill.bill.name;
    }

    var getPriceBeforeTip = function() {
      return mybill.bill.subtotal;
    }

    var getTipRate = function() {
      return mybill.bill.tipRate;
    }

    var getTaxRate = function() {
      return mybill.bill.taxRate;
    }

    var clearAllBill = function() {
      mybill = {}; 
      mybill.name;
      mybill.items; // an array of [itemName, price, people]
      mybill.priceBeforeTip;
      mybill.tipRate;
      mybill.taxRate;

      allItems = [];

      subtotal = 0;
    }

    var submitSplit = function(data) {
      // console.log('she gave me a straight up grape soda')
      return $http({
        method: 'POST',
        url: '/bills',
        data: data
      })
    }


    return {
      allItems: allItems,
      subtotal: subtotal,
      getItems: getItems,
      pushItems: pushItems,
      getSubtotal: getSubtotal,
      updateSubtotal: updateSubtotal,
      addBill: addBill,
      removeBill: removeBill,
      getBill: getBill,
      getName: getName,
      getPriceBeforeTip: getPriceBeforeTip,
      getTipRate: getTipRate,
      getTaxRate: getTaxRate,
      clearAllBill: clearAllBill,
      submitSplit: submitSplit
    }
  })

  .factory('Party', function() {
  	var party = [];

  	var addOne = function(userObj) {
  		var user = {
  			name: userObj.username,
  			email: userObj.email,
  			items: []
  		};
  		party.push(user);
  	}

  	var getAll = function() {
  		return party;
  	}

  	var remove = function(username) {
  		for (var i = 0; i < party.length; i++) {
  			if (party[i].name === username) {
  				party.splice(i, 1);
  			}
  		}
  	}

  	var removeAll = function() {
  		party = [];
  	}

  	return {
  		party: party,
  		addOne: addOne,
  		getAll: getAll,
  		remove: remove,
  		removeAll: removeAll
  	}

  })

  .factory('Auth', function($window, $rootScope, $http) {

  var signin = function (username, password) {
    $http({
      method: 'POST',
      url: '/auth/login',
      data: {
        username: username,
        password: password
      }
    })
    .then(function(response) {
      $rootScope.username = username;
      $rootScope.signedIn = true;
      $window.location.href = '/#!/addfriend';
      console.log('login', response);
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  };

  var signup = function (username, email, pasword) {
    $http({
      method: 'POST',
      url: '/auth/register',
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    .then(function(response) {
      $rootScope.signedIn = true;
      $window.location.href = '/#!/addfriend';
      console.log('signed up', response);
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  };

  return {
    signin: signin,
    signup: signup
  }
  
});
