angular.module('myApp.services',[])
	.factory('Friends', function() {

		var friends = []; // friend is object

		var getAll = function() {
			return friends;
		}

		var addOne = function(friendname) {
			var index = -1;
			for (var i = 0; i < friends.length; i++) {
				if (friends[i].name === friendname) {
					index = i;
				}
			}
			if (index === -1) {
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

/*
		var getAll = function () {
		    return $http({
		      method: 'GET',
		      url: '/api/friends'
		    })
		    .then(function (response) {
		      return response.data;
		    });
		};

		var addOne = function (friend) {
		    return $http({
				method: 'POST',
				url: '/api/friends',
				data: friend
		    });
		};

		return {
			getAll: getAll,
			addOne: addOne
		};
*/
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

		var addBill = function(bill) {
			mybill.name = bill.name;
			mybill.items = bill.items; // an array of [itemName, price, people]
			mybill.priceBeforeTip = bill.priceBeforeTip;
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

		var getItems = function() {
			return mybill.bill.items;
		}

		var getPriceBeforeTip = function() {
			return mybill.bill.priceBeforeTip;
		}

		var getTipRate = function() {
			return mybill.bill.tipRate;
		}

		var getTaxRate = function() {
			return mybill.bill.taxRate;
		}

		return {
			addBill: addBill,
			removeBill: removeBill,
			getBill: getBill,
			getName: getName,
			getItems: getItems,
			getPriceBeforeTip: getPriceBeforeTip,
			getTipRate: getTipRate,
			getTaxRate: getTaxRate
		}
	})
