import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcryptOriginal from 'bcrypt';
import Promise from 'bluebird';
import { User } from '../db/models';

var bcrypt = Promise.promisifyAll(bcryptOriginal);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }).then(function(user) {
    done(null, user);
  }).catch(function(err) {
    done(err); 
  });
});

passport.use(new LocalStrategy({ passReqToCallback: true },
  function(req, username, password, done) {
    User.findOne({ username: username }).then(function(user) {
      if (user) {
        bcrypt.compareAsync(password, user.password)
          .then(function(isCorrect) {
            return isCorrect ? done(null, user) : done(null, false);
          }).catch(function(err) {
            return done(err); 
          });
      } else {
        return done(null, false);
      }
    });
  }));

function auth(req, res, next) {
  !req.isAuthenticated() ? req.send(401) : next();
}

function login(req, res, next) {
  req.session.username = req.user.username;
  console.log('Logged in user:', req.session.username);
  console.log('Session', req.session);
  res.redirect('/');
}

function register(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        return bcrypt.genSaltAsync()
          .then(function(salt) {
            return bcrypt.hashAsync(password, salt);
          }).then(function(hashedPassword) {
            var newUser = new User({ 
              username: username,
              password: hashedPassword,
              email: email
            });

            return newUser.save();
          }).then(function(user) {
            next();
          }).catch(function(err) {
            res.status(400).end();
          });
      } else {
        res.status(409).end('user exists');
      }
    });
}

function logout(req, res, next) {
  req.session.destroy(function(err) {
    res.clearCookie('connect.sid');
    res.end('Logged out');
    // res.redirect('/auth/login');
  });
}

function checkAuth(req, res) {
  if (req.session.username) {
    res.json({'loggedIn': true});
    console.log('LOGGED IN:', req.session.username);
  } else {
    res.json({'loggedIn': false});
    console.log('NOT LOGGED IN');
  }
};

export { passport, login, register, logout, checkAuth };
