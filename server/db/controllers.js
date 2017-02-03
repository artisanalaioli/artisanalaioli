import { User } from './models.js';
import { Bill } from './models.js';
//.findOne, .create, .find({})


// ALL UNTESTED


function getAllUsers(req, res, next) {
  User.find({})
  .then(function(users) {
    res.send(users);
  });
}

function getFriends(req, res, next) {
  User.findOne({id: SOMETHING})
  .then(function(user) {
    User.find({})
    .where(id).in(user.friends)
    .then(function(friends) {
      res.send(friends);
    });
  });
}

function addFriend(req, res, next) {
  User.findOne({id: SOMETHING})
  .then(function(user) {
    User.findOne({username: req.body.SOMETHING})
    .then(function(friend) {
      user.friends.push(friend.id);
      user.save(function(error, savedUser) {
        if (error) {
          console.log(error); 
        } else {
          res.end('Friend added');
        }
      });
    });
  });
}

function removeFriend(req, res, next) {
  User.findOne({id: SOMETHING})
  .then(function(user) {
    for (var i = 0; i < user.friends.length; i++) {
      if (user.friends[i].username === req.body.SOMETHING) {
        user.friends.splice(i,1);
      }
    }
    user.save(function(error, savedUser) {
      if (error) {
        console.log(error); 
      } else {
        res.end('Friend removed');
      }
    });
  });
}
/*
Consider refactoring to also send all bills related to you (the ones
you don't own but were part of)

When refactoring to also retrieve outstanding debts & debtors,
send an object instead of an array:
  var allBills = {
    'bills': bills,
    debts: [],
    debtors: []
  };
*/
function getOwnBills(req, res, next) {
  User.findOne({_id: req.body.userID})
  .then(function(user) {
    Bill.find({})
    .where('_id').in(user.bills)
    .then(function(bills) {
      res.send(bills);
    });
  });
}

function postBill(req, res, next) {
  var newBill = {
    userID: req.body.userID,
    total: req.body.total,
    people: req.body.people,
    info: req.body.info
  };
  Bill.create(newBill)
  .then(function(createdBill) {
    User.findOne({_id: req.body.userID})
    .then(function(user) {
      user.bills.push(createdBill._id);
      user.save(function(error, savedUser) {
        if (error) {
          console.log(error); 
        } else {
          res.status(201).end('Bill saved');
        }
      });
    });
  });
}

export { postBill, getOwnBills, getAllUsers, getFriends, addFriend, removeFriend };


