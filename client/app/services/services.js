angular.module('myApp.services',[])
	.factory('Friends', function() {

		var friends = [];

		var getAll = function() {
			return friends;
		}

		var addOne = function(friend) {
			if (!friends.includes(friend)) {
				friends.push(friend);
			}
		}

		var removeOne = function(friend) {
			var index = friends.indexOf(friend);
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
		mybill.items; // an array of [itemName, price]
		mybill.priceBeforeTip;
		mybill.tiprate;

		var addBill = function(bill) {
			mybill.name = bill.name;
			mybill.items = bill.items; // an array of [itemName, price]
			mybill.priceBeforeTip = bill.priceBeforeTip;
			mybill.tiprate = bill.tiprate;			
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

		var getTiprate = function() {
			return mybill.bill.tiprate;
		}

		return {
			addBill: addBill,
			removeBill: removeBill,
			getBill: getBill,
			getName: getName,
			getItems: getItems,
			getPriceBeforeTip: getPriceBeforeTip,
			getTiprate: getTiprate
		}
	})
