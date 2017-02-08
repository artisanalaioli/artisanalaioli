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
    var allItems = [];

    var getItems = function() {
      return allItems;
    }

    var pushItems = function(items) {
      allItems = items;
    }

    return {
      allItems: allItems,
      getItems: getItems,
      pushItems: pushItems,
    }
  });