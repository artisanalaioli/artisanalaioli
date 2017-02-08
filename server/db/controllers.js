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
  User.findOne({id: req.session.passport.user})
  .then(function(user) {
    User.find({})
    .where(id).in(user.friends)
    .then(function(friends) {
      res.send(friends);
    });
  });
}
//edit
function addFriend(req, res, next) {
  User.findOne({id: req.session.passport.user})
  .then(function(user) {
    User.findOne({username: req.body.FRIENDUSERNAME})
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
//edit
function removeFriend(req, res, next) {
  User.findOne({id: req.session.passport.user})
  .then(function(user) {
    for (var i = 0; i < user.friends.length; i++) {
      if (user.friends[i].username === req.body.FRIENDUSERNAME) {
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
  console.log(req.session);
  if (req.session.passport !== undefined) {
    User.findOne({_id: req.session.passport.user})
    .then(function(user) {
      console.log(user);
      Bill.find({})
      .where('_id').in(user.bills)
      .then(function(bills) {
        res.send(bills);
      });
    });
  } else {
    res.end('Not logged in');
  }

}

function postBill(req, res, next) {
  console.log(req.body);
  var newBill = {
    userID: req.session.passport.user,
    restaurant: req.body.restaurant,
    total: req.body.total,
    people: req.body.people,
    info: req.body.info
  };
  Bill.create(newBill)
  .then(function(createdBill) {
    User.findOne({_id: req.session.passport.user})
    .then(function(user) {
      user.bills.push(createdBill._id);
      user.save(function(error, savedUser) {
        if (error) {
          console.log(error); 
        } else {
          res.status(201).end('Bill saved');
          // res.redirect('/#!/bills')
        }
      });
    });
  });
}

export { postBill, getOwnBills, getAllUsers, getFriends, addFriend, removeFriend };


