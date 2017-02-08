angular.module('myApp.services',[])
  .factory('Friends', function() {

    var friends = []; // friend is object

    var getAll = function() {
       return friends;
    }


    var addOne = function(friendname, yourName) {
      var index = -1;
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].name === friendname) {
          index = i;
        }
      }
      if (index === -1) {
        if (friends.length === 0) friends.push({ name: yourName, items: []});
        friends.push({name: friendname, items: []});
      }
    }

    var removeOne = function(friend) {
      var index = -1;
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].name === friend.name) {
          index = i;
        }
      }
      if (index !== -1) {
        friends.splice(index, 1);
      }
    }

    var removeAll = function() {
      friends = [];
    }

   return {
      getAll: getAll,
      addOne: addOne,
      removeOne: removeOne,
      removeAll: removeAll
    }

  })

  /************ fetch data from database **************/

  // .factory('Friends',['$resource', function($resource) {

  // 	return $resource('/frinds/:friendId.json', {}, {
  // 		query: {
  //         	method: 'GET',
  //         	params: {friendId: 'friends'},
  //         	isArray: true
  //         }
  //		});
  // }
  // ])

  /*****************************************************/
  
  .factory('Bill', function() {
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
    }
  })

  .factory('Party', function() {
  	var party = [];

  	var addOne = function(userObj) {
  		var user = {
  			username: userObj.username,
  			email: userObj.email
  		};
  		party.push(user);
  	}

  	var getAll = function() {
  		return party;
  	}

  	var remove = function(username) {
  		for (var i = 0; i < party.length; i++) {
  			if (party[i].username === username) {
  				party.splice(i, 1);
  			}
  		}
  	}

  	return {
  		party: party,
  		addOne: addOne,
  		getAll: getAll,
  		remove: remove
  	}

  });
