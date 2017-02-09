angular.module('myApp.services',[])
  
  .factory('Bill', function($http) {
    var mybill = {}; 
    mybill.name;
    mybill.items = []; // an array of [itemName, price, people]
    mybill.subtotal;
    mybill.tipRate;
    mybill.taxRate;


    var getItems = function() {
      return mybill.items;
    }

    var pushItems = function(items) {
      mybill.items = items;
    }

    var getSubtotal = function() {
      return mybill.subtotal;
    }

    var updateSubtotal = function(newSub) {
      mybill.subtotal = newSub;
    }

   var addBill = function(bill) {
      mybill.name = bill.name;
      mybill.items = bill.items; // an array of [itemName, price, people]
      mybill.subtotal = bill.subtotal;
      mybill.tipRate = bill.tipRate;  
      mybill.taxRate = bill.taxRate;  
      mybill.tax = bill.tax;
      mybill.tip = bill.tip
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
      mybill.items = []; // an array of [itemName, price, people]
      mybill.priceBeforeTip;
      mybill.tipRate;
      mybill.taxRate;
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

  });
